import {Component, OnInit} from '@angular/core';
import {LancamentoFiltro, LancamentoService} from "../lancamento.service";

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  public lancamentos: Lancamento[] = [];
  public descricao = ''
  dataVencimentoInicio: Date
  dataVencimentoFim: Date
  itensPorPagina = 10
  pagina = 0
  totalRecords: number;
  loading = true;
  first: number;

  constructor(private lancamentoService: LancamentoService) {
  }

  ngOnInit() {
    this.pesquisar();
  }


  public pesquisar() {
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim,
      itensPorPagina: this.itensPorPagina,
      pagina: this.pagina
    }

    this.lancamentoService.pesquisar(filtro).subscribe(
      {
        next: (result: any) => {
          this.lancamentos = result.content as Lancamento[];
          this.totalRecords = result.totalElements;
          this.loading = false;
        }
      }
    )
  }

  onPageChange(event: any) {
    this.itensPorPagina = event.rows
    this.pagina = event.first / event.rows
    this.pesquisar()
  }

}

interface Lancamento {
  tipo: string;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  pessoa: string;
}
