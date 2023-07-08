import {Component} from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  public lancamentos: Lancamento[] = [
    {
      tipo: 'DESPESA',
      descricao: 'Compra de pão',
      dataVencimento: new Date('2023-06-30'),
      dataPagamento: new Date('2023-06-25'),
      valor: 4.55,
      pessoa: 'Padaria do José'
    },
    {
      tipo: 'RECEITA',
      descricao: 'Venda de produtos',
      dataVencimento: new Date('2023-06-25'),
      dataPagamento: new Date('2023-05-15'),
      valor: 500.00,
      pessoa: 'Cliente A'
    },
    {
      tipo: 'DESPESA',
      descricao: 'Pagamento do aluguel',
      dataVencimento: new Date('2023-05-10'),
      dataPagamento: new Date('2023-05-12'),
      valor: 1000.00,
      pessoa: 'João da Silva'
    },
    {
      tipo: 'DESPESA',
      descricao: 'Compra de material de escritório',
      dataVencimento: new Date('2023-06-25'),
      dataPagamento: new Date('2023-06-30'),
      valor: 50.75,
      pessoa: 'Papelaria ABC'
    },
    {
      tipo: 'RECEITA',
      descricao: 'Reembolso de despesas',
      dataVencimento: new Date('2023-06-25'),
      dataPagamento: new Date('2023-06-20'),
      valor: 250.00,
      pessoa: 'Empresa XYZ'
    },
    {
      tipo: 'DESPESA',
      descricao: 'Pagamento de telefone',
      dataVencimento: new Date('2023-06-15'),
      dataPagamento: new Date('2023-06-20'),
      valor: 75.50,
      pessoa: 'Operadora XYZ'
    },
    {
      tipo: 'DESPESA',
      descricao: 'Compra de comida',
      dataVencimento: new Date('2023-06-05'),
      dataPagamento: new Date('2023-06-07'),
      valor: 30.00,
      pessoa: 'Mercado Superbom'
    },
    {
      tipo: 'RECEITA',
      descricao: 'Recebimento de honorários',
      dataVencimento: new Date('2023-06-25'),
      dataPagamento: new Date('2023-06-25'),
      valor: 1000.00,
      pessoa: 'Cliente B'
    },
    {
      tipo: 'DESPESA',
      descricao: 'Pagamento de internet',
      dataVencimento: new Date('2023-06-20'),
      dataPagamento: new Date('2023-06-22'),
      valor: 85.90,
      pessoa: 'Provedor de Internet'
    },
    {
      tipo: 'DESPESA',
      descricao: 'Compra de roupas',
      dataVencimento: new Date('2023-06-18'),
      dataPagamento: new Date('2023-06-25'),
      valor: 200.00,
      pessoa: 'Loja Fashion'
    },
    {
      tipo: 'RECEITA',
      descricao: 'Venda de serviços',
      dataVencimento: new Date('2023-06-25'),
      dataPagamento: new Date('2023-06-28'),
      valor: 800.00,
      pessoa: 'Cliente C'
    }
  ];

}

interface Lancamento {
  tipo: string;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  pessoa: string;
}
