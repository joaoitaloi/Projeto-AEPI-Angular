import { Component, inject  } from '@angular/core';
import { NgClass,NgIf } from '@angular/common';
import { ZonaSeguraState } from '../../services/zona-segura-state';

type NivelRisco = 'medio' | 'alerta' | 'alto';

interface ZonaRisco {
  nome: string;
  latitude: number;
  longitude: number;
  raioMetros: number;
  assaltos: number;
  mortes: number;
  trocasTiro: number;
}

interface ResultadoRisco {
  nivel: NivelRisco;
  titulo: string;
  mensagem: string;
  pontuacao: number;
  zona?: ZonaRisco;
  distancia?: number;
}

@Component({
  selector: 'app-zona-segura',
  imports: [NgClass, NgIf],
  templateUrl: './zona-segura.html',
  styleUrl: './zona-segura.css',
})


export class ZonaSegura {
  zonaSeguraState = inject(ZonaSeguraState);
  carregando = false;
  erro = '';
  resultado: ResultadoRisco | null = null;

  // Dados para simulação
  zonasRisco: ZonaRisco[] = [
    {
      nome: 'Centro',
      latitude: -23.55052,
      longitude: -46.633308,
      raioMetros: 1500,
      assaltos: 20,
      mortes: 1,
      trocasTiro: 3
    },
    {
      nome: 'Região Norte',
      latitude: -23.52000,
      longitude: -46.62000,
      raioMetros: 2000,
      assaltos: 45,
      mortes: 4,
      trocasTiro: 9
    },
    {
      nome: 'Parque Familiar',
      latitude: -23.56000,
      longitude: -46.65000,
      raioMetros: 1200,
      assaltos: 3,
      mortes: 0,
      trocasTiro: 0
    }
  ];

  verificarZonaSegura(): void {
    this.carregando = true;
    this.erro = '';
    this.resultado = null;

    if (!navigator.geolocation) {
      this.erro = 'Seu navegador não suporta localização.';
      this.carregando = false;
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (posicao) => {
        const latitude = posicao.coords.latitude;
        const longitude = posicao.coords.longitude;

        this.resultado = this.analisarRisco(latitude, longitude);
        this.carregando = false;
      },
      () => {
        this.erro = 'Não foi possível obter sua localização. Permita o acesso no navegador.';
        this.carregando = false;
      },
      {
        enableHighAccuracy: true,
        timeout: 10000
      }
    );
  }

  private analisarRisco(latitude: number, longitude: number): ResultadoRisco {
    const zonasProximas = this.zonasRisco
      .map((zona) => {
        const distancia = this.calcularDistanciaMetros(
          latitude,
          longitude,
          zona.latitude,
          zona.longitude
        );

        return {
          zona,
          distancia,
          pontuacao: this.calcularPontuacao(zona)
        };
      })
      .filter((item) => item.distancia <= item.zona.raioMetros)
      .sort((a, b) => b.pontuacao - a.pontuacao);

    if (zonasProximas.length === 0) {
      return {
        nivel: 'medio',
        titulo: 'Médio',
        mensagem: 'Lugar Apto para ir com a família.',
        pontuacao: 0
      };
    }

    const maiorRisco = zonasProximas[0];
    const nivel = this.classificarNivel(maiorRisco.pontuacao);

    return {
      nivel,
      titulo: this.obterTitulo(nivel),
      mensagem: this.obterMensagem(nivel),
      pontuacao: maiorRisco.pontuacao,
      zona: maiorRisco.zona,
      distancia: Math.round(maiorRisco.distancia)
    };
  }

  private calcularPontuacao(zona: ZonaRisco): number {
    return zona.assaltos * 2 + zona.mortes * 10 + zona.trocasTiro * 6;
  }

  private classificarNivel(pontuacao: number): NivelRisco {
    if (pontuacao >= 80) {
      return 'alto';
    }

    if (pontuacao >= 40) {
      return 'alerta';
    }

    return 'medio';
  }

  private obterTitulo(nivel: NivelRisco): string {
    const titulos = {
      medio: 'Médio',
      alerta: 'Alerta',
      alto: 'Alto Risco'
    };

    return titulos[nivel];
  }

  private obterMensagem(nivel: NivelRisco): string {
    const mensagens = {
      medio: 'Lugar Apto para ir com a família.',
      alerta: 'Lugar Parcialmente Apto para ir com a família.',
      alto: 'Não leve sua família, muito arriscado!!!'
    };

    return mensagens[nivel];
  }

  private calcularDistanciaMetros(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const raioTerra = 6371000;
    const dLat = this.grausParaRadianos(lat2 - lat1);
    const dLon = this.grausParaRadianos(lon2 - lon1);

    const calculoa =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.grausParaRadianos(lat1)) *
        Math.cos(this.grausParaRadianos(lat2)) *
        Math.sin(dLon / 2) ** 2;

    return raioTerra * 2 * Math.atan2(Math.sqrt(calculoa), Math.sqrt(1 - calculoa));
  }

  private grausParaRadianos(valor: number): number {
    return valor * Math.PI / 180;
  } 
}
