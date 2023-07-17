import {Component, OnInit} from '@angular/core';
import {LancamentoService} from "../lancamento.service";

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  public lancamentos: Lancamento[] = [];
  public descricao= ''
  constructor(private lancamentoService: LancamentoService) {
  }

  ngOnInit() {
    this.pesquisar();
  }


  public pesquisar() {
    this.lancamentoService.pesquisar({descricao: this.descricao }).subscribe(
      {
        next: (result: any) => {
          this.lancamentos = result.content as Lancamento[];
        }
      }
    )
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
