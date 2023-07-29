import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import * as moment from "moment";

export class LancamentoFiltro {
  descricao: string
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private baseUrl = "http://localhost:3000/lancamentos"

  constructor(private http: HttpClient) {
  }

  public pesquisar(filtro: LancamentoFiltro) {
    let params = new HttpParams();
    if (filtro?.descricao) {
      params = params.append('descricao', filtro.descricao);
    }
    if (filtro?.dataVencimentoInicio) {
      params = params.append('dataDeVencimentoDe', moment(filtro.dataVencimentoInicio).format("YYYY-MM-DD"));
    }
    if (filtro?.dataVencimentoFim) {
      params = params.append('dataDeVencimentoAte', moment(filtro.dataVencimentoFim).format("YYYY-MM-DD"));
    }

    params = params.append("page", filtro.pagina)
    params = params.append("size", filtro.itensPorPagina)

    return this.http.get(this.baseUrl, {
      params: params
    });
  }

  excluir(codigo: number){
    return this.http.delete(`${this.baseUrl}/${codigo}`)
  }

  criar(lancamento: any) {
    return this.http.post(this.baseUrl, lancamento)
  }

}
