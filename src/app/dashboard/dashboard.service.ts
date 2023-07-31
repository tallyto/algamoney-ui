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

  lancamentosPorPessoa(inicio: Date, fim: Date) {
    let params = new HttpParams()
    if (inicio) {
      params = params.append('dataDeVencimentoDe', moment(inicio).format("YYYY-MM-DD"));
    }
    if (fim) {
      params = params.append('dataDeVencimentoAte', moment(fim).format("YYYY-MM-DD"));
    }

    return this.http.get(`${this.baseUrl}/lancamentos/estatisticas/por-pessoa`, {
      params
    });
  }
}
