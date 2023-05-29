import { Component } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos : Lancamento [] = [
    {tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: '30/06/2017', dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José'},
    {tipo: 'RECEITA', descricao: 'Venda de produtos', dataVencimento: null, dataPagamento: '15/05/2023', valor: 500.00, pessoa: 'Cliente A'},
    {tipo: 'DESPESA', descricao: 'Pagamento do aluguel', dataVencimento: '10/05/2023', dataPagamento: '12/05/2023', valor: 1000.00, pessoa: 'João da Silva'},
    {tipo: 'DESPESA', descricao: 'Compra de material de escritório', dataVencimento: '25/06/2023', dataPagamento: '30/06/2023', valor: 50.75, pessoa: 'Papelaria ABC'},
    {tipo: 'RECEITA', descricao: 'Reembolso de despesas', dataVencimento: null, dataPagamento: '20/06/2023', valor: 250.00, pessoa: 'Empresa XYZ'},
    {tipo: 'DESPESA', descricao: 'Pagamento de telefone', dataVencimento: '15/06/2023', dataPagamento: '20/06/2023', valor: 75.50, pessoa: 'Operadora XYZ'},
    {tipo: 'DESPESA', descricao: 'Compra de comida', dataVencimento: '05/06/2023', dataPagamento: '07/06/2023', valor: 30.00, pessoa: 'Mercado Superbom'},
    {tipo: 'RECEITA', descricao: 'Recebimento de honorários', dataVencimento: null, dataPagamento: '25/06/2023', valor: 1000.00, pessoa: 'Cliente B'},
    {tipo: 'DESPESA', descricao: 'Pagamento de internet', dataVencimento: '20/06/2023', dataPagamento: '22/06/2023', valor: 85.90, pessoa: 'Provedor de Internet'},
    {tipo: 'DESPESA', descricao: 'Compra de roupas', dataVencimento: '18/06/2023', dataPagamento: '25/06/2023', valor: 200.00, pessoa: 'Loja Fashion'},
    {tipo: 'RECEITA', descricao: 'Venda de serviços', dataVencimento: null, dataPagamento: '28/06/2023', valor: 800.00, pessoa: 'Cliente C'}
  ]

}
interface Lancamento {
  tipo: string;
  descricao: string;
  dataVencimento: string | null;
  dataPagamento: string | null;
  valor: number;
  pessoa: string;
}
