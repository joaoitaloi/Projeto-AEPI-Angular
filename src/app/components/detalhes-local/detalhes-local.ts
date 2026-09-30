import { Component, EventEmitter, Input, Output, inject, computed } from '@angular/core';
import { Local,Avaliacao } from '../../models/local';
import { FormsModule } from '@angular/forms';
import { LocalService } from '../../services/local';

@Component({
  selector: 'app-detalhes-local',
  imports: [FormsModule],
  templateUrl: './detalhes-local.html',
  styleUrl: './detalhes-local.css',
})
export class DetalhesLocal {
  @Input() local!: Local;
  @Output() fechar = new EventEmitter<void>();
  private localService = inject(LocalService);

  estrelas = [1, 2, 3, 4, 5];
  fotoSelecionada: string | null = null;
  mostrarFormularioAvaliacao = false;
  notaAvaliacao = 0;
  nomeAvaliacao = '';
  comentarioAvaliacao = '';
  fotoAvaliacao = '';

  abrirFoto(foto: string) {
    this.fotoSelecionada = foto;
  }

  fecharFoto() {
    this.fotoSelecionada = null;
  }

  fecharModal() {
    this.fechar.emit();
  }

  calcularPreenchimento(estrela: number, nota: number) {
    if (nota >= estrela) {
      return 100;
    }
    if (nota > estrela - 1) {
      return (nota - (estrela - 1)) * 100;
    }
    return 0;
  }

  abrirAvaliacao() {
    this.mostrarFormularioAvaliacao = true;
  }

  fecharAvaliacao() {
    this.mostrarFormularioAvaliacao = false;
  }

  selecionarNota(nota: number) {
    this.notaAvaliacao = nota;
  }

  selecionarFotoAvaliacao(event: Event) {
    const input = event.target as HTMLInputElement;
    const arquivo = input.files?.[0];

    if (arquivo) {
      const leitor = new FileReader();

      leitor.onload = () => {
        this.fotoAvaliacao = leitor.result as string;
      };

      leitor.readAsDataURL(arquivo);
    }
  }

  enviarAvaliacao() {
    if (
      this.notaAvaliacao === 0 ||
      !this.nomeAvaliacao.trim() ||
      !this.comentarioAvaliacao.trim()
    ) {
      return;
    }

    const novaAvaliacao: Avaliacao = {
      usuario: this.nomeAvaliacao.trim(),
      foto: 'Assets/Images-Usuarios/icone-de-pessoa.png',
      mensagem: this.comentarioAvaliacao.trim(),
      fotos: this.fotoAvaliacao ? [this.fotoAvaliacao] : [],
      nota: this.notaAvaliacao,
    };

    this.localService.adicionarAvaliacao(this.local.id, novaAvaliacao);

    this.notaAvaliacao = 0;
    this.nomeAvaliacao = '';
    this.comentarioAvaliacao = '';
    this.fotoAvaliacao = '';
    this.mostrarFormularioAvaliacao = false;
  }

  localAtualizado = computed(() => {
  return this.localService.locais().find(
    (local) => local.id === this.local.id
  ) ?? this.local;
});
}
