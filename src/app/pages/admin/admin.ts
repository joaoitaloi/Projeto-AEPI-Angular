import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LocalService } from '../../services/local';
import { Local } from '../../models/local';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  constructor(private router: Router) {}
  private localService = inject(LocalService);
  locais = this.localService.locais;
  idParaExcluir: number | null = null;
  idEditando: number | null = null;
  mostrarFormulario = false;
  imagem = '';
  mensagem = signal('');
  tipoMensagem = signal<'sucesso' | 'erro' | ''>('');

  horarios = {
    domingo: '',
    segunda: '',
    terca: '',
    quarta: '',
    quinta: '',
    sexta: '',
    sabado: '',
  };

  acessibilidade: string[] = [];
  nome = '';
  categoria: 'shopping' | 'mercado' | 'restaurante' = 'shopping';
  endereco = '';
  avaliacao = 0;
  quantidadeAvaliacoes = 0;
  telefone = '';
  site = '';

  sair() {
    localStorage.removeItem('adminLogado');
    this.router.navigate(['/admin/login']);
  }

  abrirFormulario() {
    this.idEditando = null;
    this.limparFormulario();
    this.mostrarFormulario = true;
  }

  fecharFormulario() {
    this.mostrarFormulario = false;
  }

  selecionarImagem(event: Event) {
    const input = event.target as HTMLInputElement;
    const arquivo = input.files?.[0];

    if (arquivo) {
      const leitor = new FileReader();

      leitor.onload = () => {
        this.imagem = leitor.result as string;
      };

      leitor.readAsDataURL(arquivo);
    }
  }

  alterarAcessibilidade(event: Event, item: string) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.acessibilidade.push(item);
    } else {
      this.acessibilidade = this.acessibilidade.filter((acessibilidade) => acessibilidade !== item);
    }
  }

  cadastrarLocal() {
    const novoLocal: Local = {
      id: Date.now(),
      nome: this.nome.trim(),
      categoria: this.categoria,
      endereco: this.endereco.trim(),
      imagem: this.imagem,
      avaliacao: this.avaliacao,
      quantidadeAvaliacoes: this.quantidadeAvaliacoes,
      site: this.site.trim(),
      telefone: this.telefone.trim(),
      horarios: { ...this.horarios },
      avaliacoes: [],
      acessibilidade: [...this.acessibilidade],
      favorito: false,
    };

    this.localService.adicionarLocal(novoLocal);
    console.log('Local cadastrado:', novoLocal);
  }

  enviarFormulario(form: NgForm) {
    if (form.invalid || !this.imagem) {
      form.control.markAllAsTouched();
      this.mostrarMensagem('Preencha todas as informações obrigatórias.', 'erro');
      return;
    }

    if (this.idEditando !== null) {
      this.atualizarLocal();
      this.mostrarMensagem('Local atualizado com sucesso!', 'sucesso');
    } else {
      this.cadastrarLocal();
      this.mostrarMensagem('Local cadastrado com sucesso!', 'sucesso');
    }

    this.limparFormulario();
    this.idEditando = null;
    this.mostrarFormulario = false;
  }

  removerLocal(id: number) {
    this.idParaExcluir = id;
  }

  confirmarExclusao() {
    if (this.idParaExcluir !== null) {
      this.localService.removerLocal(this.idParaExcluir);
      this.idParaExcluir = null;
      this.mostrarMensagem('Local excluído com sucesso!', 'sucesso');
    }
  }

  cancelarExclusao() {
    this.idParaExcluir = null;
  }

  mostrarMensagem(texto: string, tipo: 'sucesso' | 'erro') {
    this.mensagem.set(texto);
    this.tipoMensagem.set(tipo);

    setTimeout(() => {
      console.log('SUMINDO MENSAGEM');
      this.mensagem.set('');
      this.tipoMensagem.set('');
    }, 1000);
  }

  limparFormulario() {
    this.nome = '';
    this.categoria = 'shopping';
    this.endereco = '';
    this.imagem = '';
    this.avaliacao = 0;
    this.quantidadeAvaliacoes = 0;
    this.telefone = '';
    this.site = '';

    this.horarios = {
      domingo: '',
      segunda: '',
      terca: '',
      quarta: '',
      quinta: '',
      sexta: '',
      sabado: '',
    };

    this.acessibilidade = [];
  }

  editarLocal(local: Local) {
    this.idEditando = local.id;

    this.nome = local.nome;
    this.categoria = local.categoria;
    this.endereco = local.endereco;
    this.imagem = local.imagem;
    this.avaliacao = local.avaliacao;
    this.quantidadeAvaliacoes = local.quantidadeAvaliacoes;
    this.telefone = local.telefone;
    this.site = local.site;
    this.horarios = { ...local.horarios };
    this.acessibilidade = [...local.acessibilidade];

    this.mostrarFormulario = true;
  }

  atualizarLocal() {
    if (this.idEditando === null) return;

    const localAntigo = this.locais().find((local) => local.id === this.idEditando);

    if (!localAntigo) return;

    const localAtualizado: Local = {
      id: this.idEditando,
      nome: this.nome.trim(),
      categoria: this.categoria,
      endereco: this.endereco.trim(),
      imagem: this.imagem,
      avaliacao: this.avaliacao,
      quantidadeAvaliacoes: this.quantidadeAvaliacoes,
      site: this.site.trim(),
      telefone: this.telefone.trim(),
      horarios: { ...this.horarios },
      avaliacoes: localAntigo.avaliacoes,
      acessibilidade: [...this.acessibilidade],
      favorito: localAntigo.favorito,
    };

    this.localService.atualizarLocal(localAtualizado);
  }

  removerAvaliacao(idLocal: number, indiceAvaliacao: number) {
  this.localService.removerAvaliacao(idLocal, indiceAvaliacao);
  this.mostrarMensagem('Avaliação excluída com sucesso!', 'sucesso');
}
}
