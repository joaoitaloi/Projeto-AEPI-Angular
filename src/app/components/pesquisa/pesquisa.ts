import { Component, inject } from '@angular/core';
import { LocalService } from '../../services/local';

@Component({
  selector: 'app-pesquisa',
  imports: [],
  templateUrl: './pesquisa.html',
  styleUrl: './pesquisa.css',
})
export class Pesquisa {
  private localService = inject(LocalService);

  pesquisar(event: Event) {
    const input = event.target as HTMLInputElement;
    this.localService.termoPesquisa.set(input.value.trim().toLowerCase());
  }

  ordenar(event: Event) {
    const select = event.target as HTMLSelectElement;
    const valor = select.value as 'original' | 'nome' | 'avaliacao';
    this.localService.ordenacao.set(valor);
  }
}
