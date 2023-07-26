import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PessoaFilter, PessoasService} from "../pessoas.service";
import {Subject, takeUntil} from "rxjs";
import {Table} from "primeng/table";

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit, OnDestroy{
  @ViewChild('table') grid: Table
  public pessoa: Pessoa[] = []
  public nome: string

  private unsubscribe = new Subject<void>()
  itensPorPagina = 10
  pagina = 0
  totalRecords: number;
  loading = true;


  constructor(private pessoaService: PessoasService) {

  }

  ngOnInit() {
    this.pesquisar()
  }

  public pesquisar() {
    const filter: PessoaFilter = {
      nome: this.nome,
      page: this.pagina,
      size: this.itensPorPagina
    }

    this.pessoaService.pesquisar(filter).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: ((result: any) => {
        this.pessoa = result.content;
        this.totalRecords = result.totalElements
        this.itensPorPagina = result.numberOfElements
        this.loading = false;
      })
    })
  }

  onPageChange(event: any) {
    this.itensPorPagina = event.rows
    this.pagina = event.first / event.rows
    this.pesquisar()
  }

  ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }


  onRemove(codigo: any) {
    this.pessoaService.excluir(codigo).subscribe(()=> {
      this.grid.first = 0;
      this.pesquisar()
    })
  }
}

interface Pessoa {
  nome: string;
  cidade: string;
  estado: string;
  status: boolean;
}
