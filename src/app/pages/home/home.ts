import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Hero } from '../../components/hero/hero';
import { Destaque } from '../../components/destaque/destaque';
import { Pesquisa } from '../../components/pesquisa/pesquisa';
import { FiltrosLocais } from '../../components/filtros-locais/filtros-locais';
import { Locais } from '../../components/locais/locais';
import { DetalhesLocal } from '../../components/detalhes-local/detalhes-local';
import { Local } from '../../models/local';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [Header, Hero, Destaque, Pesquisa, Locais, FiltrosLocais, DetalhesLocal, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  localSelecionado: Local | null = null;

  abrirDetalhes(local: Local) {
    this.localSelecionado = local;
    document.body.style.overflow = 'hidden';
  }

  fecharDetalhes() {
    this.localSelecionado = null;
    document.body.style.overflow = '';
  }
}