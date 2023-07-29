import {Pessoa} from "../pessoa/pessoa.model";
import {Categoria} from "../categoria/categoria.model";

export class Lancamento {
  codigo: number;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  tipo: Tipo;
  categoria: Categoria;
  pessoa: Pessoa;
}

export enum Tipo {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA'
}
