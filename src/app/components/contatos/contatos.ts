import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contatos',
  imports: [FormsModule],
  templateUrl: './contatos.html',
  styleUrl: './contatos.css',
})
export class Contatos {
  nome = '';
  email = '';
  mensagem = '';
  mensagemStatus = '';
  tipoMensagem: 'sucesso' | 'erro' | '' = '';

  enviarContato() {
    if (!this.nome.trim() || !this.email.trim() || !this.mensagem.trim()) {
      this.mensagemStatus = 'Preencha todos os campos.';
      this.tipoMensagem = 'erro';
      return;
    }

    console.log({
      nome: this.nome,
      email: this.email,
      mensagem: this.mensagem,
    });

    this.mensagemStatus = 'Mensagem enviada com sucesso!';
    this.tipoMensagem = 'sucesso';

    this.nome = '';
    this.email = '';
    this.mensagem = '';
  }
}