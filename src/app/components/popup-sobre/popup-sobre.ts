import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup-sobre',
  imports: [],
  templateUrl: './popup-sobre.html',
  styleUrl: './popup-sobre.css',
})
export class PopupSobre {
  @Output() fechar = new EventEmitter<void>()

  fecharPopup(){
    this.fechar.emit()
  }
}