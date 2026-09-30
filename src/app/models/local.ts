export interface Horarios {
  domingo: string;
  segunda: string;
  terca: string;
  quarta: string;
  quinta: string;
  sexta: string;
  sabado: string;
}

export interface Avaliacao {
  usuario: string;
  foto: string;
  mensagem: string;
  fotos: string[];
  nota: number;
}

export interface Local {
  id: number;
  nome: string;
  favorito: boolean,
  categoria: 'shopping' | 'mercado' | 'restaurante';
  endereco: string;
  imagem: string;
  avaliacao: number;
  quantidadeAvaliacoes: number;
  site: string;
  telefone: string;
  horarios: Horarios;
  avaliacoes: Avaliacao[];
  acessibilidade: string[];
}