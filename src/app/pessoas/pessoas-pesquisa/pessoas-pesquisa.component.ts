import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaFilter, PessoasService } from "../pessoas.service";
import { Table } from "primeng/table";
import {MessageService} from "primeng/api";
import {ErroHandlerService} from "../../core/erro-handler.service";

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
              private erroHandler: ErroHandlerService
  ) {}

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
    this.pessoaService.excluir(codigo).subscribe({
      next: () => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Pessoa removida com sucesso!' });
      },
      error: err => {
        this.erroHandler.handler(err)
      }
    });
  }
}

interface Pessoa {
  nome: string;
  cidade: string;
  estado: string;
  status: boolean;
}
