import {Component, OnInit, ViewChild} from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import {Table} from "primeng/table";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
})
export class LancamentosPesquisaComponent implements OnInit {
  @ViewChild('tabela') grid: Table
  public lancamentos: Lancamento[] = [];
  public descricao = '';
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  itensPorPagina = 10;
  pagina = 0;
  totalRecords: number;
  loading = true;

  constructor(private lancamentoService: LancamentoService,
              private messageService: MessageService
              ) {}

  ngOnInit() {
    this.pesquisar()
  }


  public pesquisar() {
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim,
      itensPorPagina: this.itensPorPagina,
      pagina: this.pagina
    };

    this.lancamentoService.pesquisar(filtro).subscribe({
      next: (result: any) => {
        this.lancamentos = result.content as Lancamento[];
        this.totalRecords = result.totalElements;
        this.loading = false;
      }
    });
  }

  onPageChange(event: any) {
    this.itensPorPagina = event.rows;
    this.pagina = event.first / event.rows
    this.pesquisar()
  }

  onRemove(codigo: any) {
    this.lancamentoService.excluir(codigo).subscribe(() => {
      // Após a exclusão, redefinimos os filtros e atualizamos a grid
      if(this.grid.first == 0) {
        this.pesquisar()
      }{
        this.grid.first = 0;
      }
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lançamento removido com sucesso!' });
    });
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
