import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface LancamentoFilto {
  descricao: string
}
@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private baseUrl = "http://localhost:3000/lancamentos"
  constructor(private http: HttpClient) { }

  public pesquisar(filtro: LancamentoFilto) {
    const token: String = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoLWFwaSIsInN1YiI6InRhbGx5dG8iLCJleHAiOjE2ODk1NTY3NTZ9.J3iWkopOGD9OTY1TiDPUrwvKQWCGGXJ2OkGEF24e-zg";

    return this.http.get(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        descricao: filtro?.descricao
      }
    });
  }

}
