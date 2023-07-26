import {Component, OnInit, ViewChild} from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import {Table} from "primeng/table";

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
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

  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit() {
    this.updateGrid();
  }

  public updateGrid() {
    // Atualizar a página com os filtros atuais
    this.pesquisar();
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
    this.pagina = event.first / event.rows;
    this.updateGrid(); // Quando a página muda, atualizamos a grid
  }

  onRemove(codigo: any) {
    this.lancamentoService.excluir(codigo).subscribe(() => {
      // Após a exclusão, redefinimos os filtros e atualizamos a grid
      this.grid.first = 0;
      this.updateGrid();
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
