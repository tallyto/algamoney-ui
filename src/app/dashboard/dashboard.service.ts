import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import * as moment from "moment";
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl: string


  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}`
  }

  public lancamentosPorCategoria(){
     return this.http.get(`${this.baseUrl}/lancamentos/estatisticas/por-categoria`);
  }

  lancamentosPorDia() {
    return this.http.get(`${this.baseUrl}/lancamentos/estatisticas/por-dia`);
  }

  lancamentosPorPessoa(inicio: string, fim: string) {
    let params = new HttpParams()
    params = params.append("dataDeVencimentoDe", inicio)
    params = params.append("dataDeVencimentoAte", fim)

    return this.http.get(`${this.baseUrl}/lancamentos/estatisticas/por-pessoa`, {
      params
    });
  }
}
