import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Local, Avaliacao } from '../models/local';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  private platformId = inject(PLATFORM_ID);
  filtroCategoria = signal<'todos' | 'shopping' | 'mercado' | 'restaurante' | 'favoritos'>('todos');
  termoPesquisa = signal('');
  ordenacao = signal<'original' | 'nome' | 'avaliacao'>('original');

  locais = signal<Local[]>([
    // Shoppings
    {
      id: 1,
      nome: 'Shopping da Bahia',
      favorito: false,
      categoria: 'shopping',
      endereco: 'Av. Tancredo Neves',
      imagem: 'Assets/Images-Locais/Foto-Local-Shopping-Bahia.png',
      avaliacao: 4.5,
      quantidadeAvaliacoes: 74393,
      site: 'https://shoppingdabahia.com.br/',
      telefone: '(71) 3838-8590',
      horarios: {
        domingo: '12:00 – 21:00',
        segunda: '09:00 – 22:00',
        terca: '09:00 – 22:00',
        quarta: '09:00 – 22:00',
        quinta: '09:00 – 22:00',
        sexta: '09:00 – 22:00',
        sabado: '09:00 – 22:00',
      },
      avaliacoes: [
        {
          usuario: 'Joao Pedro',
          foto: 'Assets/Images-Usuarios/icone-de-pessoa.png',
          mensagem: 'Shooping muito bonito, espaço limpo e organizado',
          fotos: [''],
          nota: 4.1,
        },
      ],
      acessibilidade: [
        'Entrada com acessibilidade para pessoas em cadeira de rodas',
        'Banheiro com acessibilidade para pessoas em cadeira de rodas',
        'Estacionamento com acessibilidade para pessoas em cadeira de rodas',
      ],
    },

    // Mercados
    {
      id: 2,
      nome: 'Atacadão',
      favorito: false,
      categoria: 'mercado',
      endereco: 'Av. Antônio Carlos Magalhães',
      imagem: 'Assets/Images-Locais/Foto-Local-Atacadao.png',
      avaliacao: 4.2,
      quantidadeAvaliacoes: 4302,
      site: 'https://www.atacadao.com.br/',
      telefone: '(73) 3511-2625',
      horarios: {
        domingo: 'Fechado',
        segunda: '07:00 – 22:00',
        terca: '07:00 – 22:00',
        quarta: '07:00 – 22:00',
        quinta: '07:00 – 22:00',
        sexta: '07:00 – 22:00',
        sabado: '07:00 – 22:00',
      },
      avaliacoes: [
        {
          usuario: 'Pedro',
          foto: 'Assets/Images-Usuarios/icone-de-pessoa.png',
          mensagem: 'Mercado com otimos preços, mas senti falta de um banheiro acessivel',
          fotos: [''],
          nota: 3.8,
        },
      ],
      acessibilidade: [
        'Entrada com acessibilidade para pessoas em cadeira de rodas',
        'Estacionamento com acessibilidade para pessoas em cadeira de rodas',
      ],
    },

    // Restaurantes
    {
      id: 3,
      nome: 'Restaurante Amado',
      favorito: false,
      categoria: 'restaurante',
      endereco: 'Av. Lafayete Coutinho',
      imagem: 'Assets/Images-Locais/Foto-Local-Amado.png',
      avaliacao: 4.6,
      quantidadeAvaliacoes: 2381,
      site: 'http://www.amadobahia.com.br/',
      telefone: '(71) 3322-3520',
      horarios: {
        domingo: '12:00 – 17:00',
        segunda: '12:00 – 22:00',
        terca: '12:00 – 22:00',
        quarta: '12:00 – 22:00',
        quinta: '12:00 – 22:00',
        sexta: '12:00 – 22:00',
        sabado: '12:00 – 22:00',
      },
      avaliacoes: [
        {
          usuario: 'Carlos Santana',
          foto: 'Assets/Images-Usuarios/icone-de-pessoa.png',
          mensagem: 'Ótimo restaurante',
          fotos: ['Assets/Images-Avaliacoes/Amado-Avaliacao.png'],
          nota: 4.7,
        },
      ],
      acessibilidade: [
        'Assento com acessibilidade para pessoas em cadeira de rodas',
        'Entrada com acessibilidade para pessoas em cadeira de rodas',
        'Banheiro com acessibilidade para pessoas em cadeira de rodas',
        'Estacionamento com acessibilidade para pessoas em cadeira de rodas',
      ],
    },
  ]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const locaisSalvos = localStorage.getItem('locais');

      if (locaisSalvos) {
        this.locais.set(JSON.parse(locaisSalvos));
      }
    }
  }

  alternarFavorito(id: number) {
    this.locais.update((locais) =>
      locais.map((local) => (local.id === id ? { ...local, favorito: !local.favorito } : local)),
    );
  }

  adicionarLocal(local: Local) {
    this.locais.update((locais) => {
      const novosLocais = [...locais, local];

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('locais', JSON.stringify(novosLocais));
      }

      return novosLocais;
    });
  }

  removerLocal(id: number) {
    this.locais.update((locais) => {
      const novosLocais = locais.filter((local) => local.id !== id);

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('locais', JSON.stringify(novosLocais));
      }
      return novosLocais;
    });
  }

  atualizarLocal(localAtualizado: Local) {
    this.locais.update((locais) => {
      const novosLocais = locais.map((local) =>
        local.id === localAtualizado.id ? localAtualizado : local,
      );

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('locais', JSON.stringify(novosLocais));
      }

      return novosLocais;
    });
  }

adicionarAvaliacao(id: number, avaliacao: Avaliacao) {
  this.locais.update((locais) => {
    const novosLocais = locais.map((local) => {
      if (local.id !== id) return local;

      const novaQuantidade = local.quantidadeAvaliacoes + 1;

      const novaMedia =
        (local.avaliacao * local.quantidadeAvaliacoes + avaliacao.nota) /
        novaQuantidade;

      return {
        ...local,
        avaliacao: Number(novaMedia.toFixed(1)),
        quantidadeAvaliacoes: novaQuantidade,
        avaliacoes: [...local.avaliacoes, avaliacao],
      };
    });

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('locais', JSON.stringify(novosLocais));
    }

    return novosLocais;
  });
}

removerAvaliacao(idLocal: number, indiceAvaliacao: number) {
  this.locais.update((locais) => {
    const novosLocais = locais.map((local) => {
      if (local.id !== idLocal) return local;

      const novasAvaliacoes = local.avaliacoes.filter(
        (_, index) => index !== indiceAvaliacao
      );

      return {
        ...local,
        avaliacoes: novasAvaliacoes,
      };
    });

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('locais', JSON.stringify(novosLocais));
    }

    return novosLocais;
  });
}
}
