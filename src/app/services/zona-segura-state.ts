import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZonaSeguraState {
  visivel = signal(false);

  abrir(): void {
    this.visivel.set(true);
  }

  fechar(): void {
    this.visivel.set(false);
  }

  alternar(): void {
    this.visivel.update((valor) => !valor);
  }
}