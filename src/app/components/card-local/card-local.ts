import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Local } from '../../models/local';
import { LocalService } from '../../services/local';

@Component({
  selector: 'app-card-local',
  imports: [],
  templateUrl: './card-local.html',
  styleUrl: './card-local.css',
})
export class CardLocal {
  @Input() local!: Local;

  private localService = inject(LocalService);

  estrelas = [1, 2, 3, 4, 5];

  @Output() verDetalhes = new EventEmitter<Local>();

  abrirDetalhes() {
    this.verDetalhes.emit(this.local);
  }

  alternarFavorito() {
    this.localService.alternarFavorito(this.local.id);
  }

  calcularPreenchimento(estrela: number) {
    if (this.local.avaliacao >= estrela) {
      return 100;
    }

    if (this.local.avaliacao > estrela - 1) {
      return (this.local.avaliacao - (estrela - 1)) * 100;
    }

    return 0;
  }

  verRota() {
    const destino = encodeURIComponent(`${this.local.nome}, ${this.local.endereco}`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destino}`, '_blank');
  }
}
