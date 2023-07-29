import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaFilter, PessoasService } from "../pessoas.service";
import { Table } from "primeng/table";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {ErroHandlerService} from "../../core/erro-handler.service";
import {Router} from "@angular/router";

const SUCCESS_MESSAGE = {severity: 'success', summary: 'Sucesso', detail: 'Pessoa removida com sucesso!'};
const REJECT_MESSAGE = {severity: 'error', summary: 'Rejeitado', detail: 'Você rejeitou a ação'};
const CANCEL_MESSAGE = {severity: 'warn', summary: 'Cancelado', detail: 'Você cancelou a ação'};
const STATUS_MESSAGE = {severity: 'success', summary: 'Sucesso', detail: 'Status alterado com sucesso!'};


@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  @ViewChild('table') grid: Table
  public pessoa: Pessoa[] = []
  public nome: string

  itensPorPagina = 10;
  pagina = 0;
  totalRecords: number;
  loading = true;

  constructor(private messageService: MessageService,
              private pessoaService: PessoasService,
              private erroHandler: ErroHandlerService,
              private confirmationService: ConfirmationService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.pesquisar();
  }

  public pesquisar() {
    const filter: PessoaFilter = {
      nome: this.nome,
      page: this.pagina,
      size: this.itensPorPagina
    };

    this.pessoaService.pesquisar(filter).subscribe({
      next: ((result: any) => {
        this.pessoa = result.content;
        this.totalRecords = result.totalElements;
        this.loading = false;
      }),
      error: err => {
        this.erroHandler.handler(err)
      }
    });
  }

  onPageChange(event: any) {
    this.itensPorPagina = event.rows;
    this.pagina = event.first / event.rows;
    this.pesquisar();
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
    this.pessoaService.excluir(codigo).subscribe({
      next: () => {
        this.messageService.add(SUCCESS_MESSAGE);
        this.updateGird()
      },
      error: err => {
        this.erroHandler.handler(err)
      }
    });
  }

  private updateGird() {
    this.grid.first = 0; // Redefinimos o valor do primeiro item da grid
    this.pagina = 0;
    this.pesquisar(); // Atualizamos a grid
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

  handlerStatus(codigo: number, status: boolean) {
    this.pessoaService.handlerStatus(codigo, status).subscribe({
      next: () => {
        this.messageService.add(STATUS_MESSAGE);
        this.updateGird()
      }
    })
  }

  novaPessoa() {
    this.router.navigate(['/pessoas', 'new']);
  }

  onEdit(codigo: number) {
    this.router.navigate(['/pessoas', codigo]);
  }
}

interface Pessoa {
  nome: string;
  cidade: string;
  estado: string;
  status: boolean;
}
