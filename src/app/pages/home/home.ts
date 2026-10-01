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
import { ZonaSegura } from '../../components/zona-segura/zona-segura';
import { Contatos } from '../../components/contatos/contatos';
import { PopupSobre } from '../../components/popup-sobre/popup-sobre';

@Component({
  selector: 'app-home',
  imports: [Header, Hero, Destaque, Pesquisa, Locais, FiltrosLocais, DetalhesLocal, Footer, ZonaSegura, Contatos, PopupSobre],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  localSelecionado: Local | null = null;
  mostrarSobre = false

  abrirDetalhes(local: Local) {
    this.localSelecionado = local;
    document.body.style.overflow = 'hidden';
  }

  fecharDetalhes() {
    this.localSelecionado = null;
    document.body.style.overflow = '';
  }

  abrirPopupSobre(){
    this.mostrarSobre = true
    document.body.style.overflow = 'hidden'
  }

  fecharPopupSobre(){
    this.mostrarSobre = false
    document.body.style.overflow = ''
  }
}