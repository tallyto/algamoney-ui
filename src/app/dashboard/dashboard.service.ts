import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

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
}
