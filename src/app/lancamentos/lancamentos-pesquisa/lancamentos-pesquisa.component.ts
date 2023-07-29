import {Component, OnInit, ViewChild} from '@angular/core';
import {LancamentoFiltro, LancamentoService} from '../lancamento.service';
import {Table} from "primeng/table";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {ErroHandlerService} from "../../core/erro-handler.service";
import {Router} from "@angular/router";


const SUCCESS_MESSAGE = {severity: 'success', summary: 'Sucesso', detail: 'Lançamento removido com sucesso!'};
const REJECT_MESSAGE = {severity: 'error', summary: 'Rejeitado', detail: 'Você rejeitou a ação'};
const CANCEL_MESSAGE = {severity: 'warn', summary: 'Cancelado', detail: 'Você cancelou a ação'};

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
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private erroHandler: ErroHandlerService,
              private router: Router
  ) {
  }

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
      },
      error: (err) => {
        this.erroHandler.handler(err)
      }
    });
  }

  onPageChange(event: any) {
    this.itensPorPagina = event.rows;
    this.pagina = event.first / event.rows
    this.pesquisar()
  }


  onRemove(codigo: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja continuar?',
      header: 'Confirmação',
      icon: 'fa-solid fa-circle-question',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.handleAccept(codigo),
      reject: (type: ConfirmEventType) => this.handleReject(type)
    });
  }

  private handleAccept(codigo: any) {
    this.lancamentoService.excluir(codigo).subscribe({
      next: () => {
        // Após a exclusão, redefinimos os filtros e atualizamos a grid
        this.grid.first = 0; // Redefinimos o valor do primeiro item da grid
        this.pagina = 0;
        this.pesquisar(); // Atualizamos a grid
        this.messageService.add(SUCCESS_MESSAGE);
      },
      error: err => {
        this.erroHandler.handler(err)
      }
    });
  }

  private handleReject(type: ConfirmEventType) {
    switch (type) {
      case ConfirmEventType.REJECT:
        this.messageService.add(REJECT_MESSAGE);
        break;
      case ConfirmEventType.CANCEL:
        this.messageService.add(CANCEL_MESSAGE);
        break;
    }
  }

  newLancamento() {
    this.router.navigate(["/lancamento-cadastro"])
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
