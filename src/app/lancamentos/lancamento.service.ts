import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import * as moment from "moment";
export interface LancamentoFiltro {
  descricao: string
  dataVencimentoInicio: Date
  dataVencimentoFim: Date
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private baseUrl = "http://localhost:3000/lancamentos"

  constructor(private http: HttpClient) {
  }

  public pesquisar(filtro: LancamentoFiltro) {
    const token: String = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6InRhbGx5dG8iLCJleHAiOjE2ODk1NTY3NTZ9.J3iWkopOGD9OTY1TiDPUrwvKQWCGGXJ2OkGEF24e-zg";

    let params = new HttpParams();
    if (filtro?.descricao) {
      params = params.append('descricao', filtro.descricao);
    }
    if (filtro?.dataVencimentoInicio) {
      params = params.append('dataDeVencimentoDe',  moment(filtro.dataVencimentoInicio).format("YYYY-MM-DD"));
    }
    if (filtro?.dataVencimentoFim) {
      params = params.append('dataDeVencimentoAte', moment(filtro.dataVencimentoFim).format("YYYY-MM-DD"));
    }

    return this.http.get(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: params
    });
  }

}
