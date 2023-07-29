import {Pessoa} from "../pessoa/pessoa.model";
import {Categoria} from "../categoria/categoria.model";

export class Lancamento {
  codigo: number;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  tipo: Tipo = Tipo.RECEITA
  categoria: Partial<Categoria>;
  pessoa: Partial<Pessoa>;

  public static toDTO(apiData: any): Lancamento {
    const lancamento: Lancamento = new Lancamento();
    lancamento.codigo = apiData.codigo;
    lancamento.descricao = apiData.descricao;
    lancamento.dataVencimento = new Date(apiData.dataVencimento);
    lancamento.dataPagamento = new Date(apiData.dataPagamento);
    lancamento.valor = apiData.valor;
    lancamento.observacao = apiData.observacao;
    lancamento.tipo = apiData.tipo;
    lancamento.categoria = {
      codigo: apiData.categoria.codigo,
      nome: apiData.categoria.nome
    };
    lancamento.pessoa = {
      codigo: apiData.pessoa.codigo,
      nome: apiData.pessoa.nome
    };
    return lancamento;
  }


  static fromDTO(dto: any) {
    const lancamento = new Lancamento()
    lancamento.pessoa = dto.pessoa
    lancamento.codigo = dto.codigo;
    lancamento.tipo = dto.tipo;
    lancamento.valor = dto.valor;
    lancamento.descricao = dto.descricao;
    lancamento.categoria = dto.categoria
    lancamento.dataPagamento = dto.dataPagamento;
    lancamento.dataVencimento = dto.dataVencimento;
    lancamento.observacao = dto.observacao
    return lancamento
  }
}

export enum Tipo {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA'
}
