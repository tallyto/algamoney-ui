import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  private baseUrl = "http://localhost:3000/pessoas"

  constructor(private http: HttpClient) {
  }

  public pesquisar(filter: PessoaFilter) {
    let params = new HttpParams();

    // Verificações nos campos do filtro e adição dos parâmetros ao HttpParams
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.append(key, value.toString());
      }
    });

    return this.http.get(this.baseUrl, {
      params: params
    });
  }
}

export interface PessoaFilter {
  nome: string
  page: number
  size: number
}
