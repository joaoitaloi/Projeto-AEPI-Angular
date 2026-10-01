import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() abrirSobre = new EventEmitter<void>()
  irParaLocais() {
    document.getElementById('explorar')?.scrollIntoView({
      behavior: 'smooth'
    });
  }

irParaContatos() {
  document.getElementById('secao-contatos')?.scrollIntoView({
    behavior: 'smooth'
  });
}

  clicarSobre(){
    this.abrirSobre.emit()
  }
}