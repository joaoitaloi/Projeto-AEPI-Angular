import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { LocalService } from '../../services/local';
import { CardLocal } from '../card-local/card-local';
import { Local } from '../../models/local';

@Component({
  selector: 'app-locais',
  imports: [CardLocal],
  templateUrl: './locais.html',
  styleUrl: './locais.css',
})
export class Locais {
  private localService = inject(LocalService);

  locais = this.localService.locais;
  filtroCategoria = this.localService.filtroCategoria;
  termoPesquisa = this.localService.termoPesquisa;
  ordenacao = this.localService.ordenacao;

  @Output() verDetalhes = new EventEmitter<Local>();

  abrirDetalhes(local: Local) {
    this.verDetalhes.emit(local);
  }

  ordenarLocais(locais: Local[]) {
    const ordenacao = this.ordenacao();

    if (ordenacao === 'nome') {
      return [...locais].sort((a, b) => a.nome.localeCompare(b.nome));
    }

    if (ordenacao === 'avaliacao') {
      return [...locais].sort((a, b) => b.avaliacao - a.avaliacao);
    }

    return locais;
  }

  shoppings = computed(() => {
    const termo = this.termoPesquisa();

    const resultado = this.locais().filter(
      (local) =>
        local.categoria === 'shopping' &&
        (local.nome.toLowerCase().includes(termo) || local.endereco.toLowerCase().includes(termo)),
    );

    return this.ordenarLocais(resultado);
  });

  mercados = computed(() => {
    const termo = this.termoPesquisa();

    const resultado = this.locais().filter(
      (local) =>
        local.categoria === 'mercado' &&
        (local.nome.toLowerCase().includes(termo) || local.endereco.toLowerCase().includes(termo)),
    );

    return this.ordenarLocais(resultado);
  });

  restaurantes = computed(() => {
    const termo = this.termoPesquisa();

    const resultado = this.locais().filter(
      (local) =>
        local.categoria === 'restaurante' &&
        (local.nome.toLowerCase().includes(termo) || local.endereco.toLowerCase().includes(termo)),
    );

    return this.ordenarLocais(resultado);
  });

  favoritos = computed(() => {
    const termo = this.termoPesquisa();

    const resultado = this.locais().filter(
      (local) =>
        local.favorito &&
        (local.nome.toLowerCase().includes(termo) || local.endereco.toLowerCase().includes(termo)),
    );

    return this.ordenarLocais(resultado);
  });

  mostrarShoppings = computed(
    () =>
      (this.filtroCategoria() === 'todos' || this.filtroCategoria() === 'shopping') &&
      this.shoppings().length > 0,
  );

  mostrarMercados = computed(
    () =>
      (this.filtroCategoria() === 'todos' || this.filtroCategoria() === 'mercado') &&
      this.mercados().length > 0,
  );

  mostrarRestaurantes = computed(
    () =>
      (this.filtroCategoria() === 'todos' || this.filtroCategoria() === 'restaurante') &&
      this.restaurantes().length > 0,
  );

  mostrarFavoritos = computed(() => this.filtroCategoria() === 'favoritos');
}
