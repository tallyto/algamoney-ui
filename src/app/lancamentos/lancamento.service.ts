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
    const token: String = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6InRhbGx5dG8iLCJleHAiOjE2ODk3MzYzNjR9.T-MrM26WWunzjm6JBm15NxImIbgzMBdQRhiCyt8BfpQ";

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
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: params
    });
  }

}
