import { Component, inject } from '@angular/core';
import { LocalService } from '../../services/local';

@Component({
  selector: 'app-filtros-locais',
  imports: [],
  templateUrl: './filtros-locais.html',
  styleUrl: './filtros-locais.css',
})
export class FiltrosLocais {
  private localService = inject(LocalService);
  locais = this.localService.locais;
  filtroCategoria = this.localService.filtroCategoria;

  filtrar(categoria: 'todos' | 'shopping' | 'mercado' | 'restaurante' | 'favoritos') {
    this.localService.filtroCategoria.set(categoria);
  }

  get quantidadeShoppings() {
    return this.locais().filter((local) => local.categoria === 'shopping').length;
  }

  get quantidadeMercados() {
    return this.locais().filter((local) => local.categoria === 'mercado').length;
  }

  get quantidadeRestaurantes() {
    return this.locais().filter((local) => local.categoria === 'restaurante').length;
  }

  get quantidadeFavoritos() {
    return this.locais().filter((local) => local.favorito).length;
  }
}
