import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Pessoa} from "../entities/pessoa/pessoa.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  private baseUrl: string

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/pessoas`
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

  public listar() {
    return this.http.get(this.baseUrl);
  }

  excluir(codigo: number) {
    return this.http.delete(`${this.baseUrl}/${codigo}`)
  }

  handlerStatus(codigo: number, status: boolean) {
    return this.http.put(`${this.baseUrl}/${codigo}/ativo`, !status)
  }

  inserir(pessoa: Pessoa) {
    return this.http.post(this.baseUrl, pessoa)
  }

  buscarPorId(pessoaId: number) {
    return this.http.get(`${this.baseUrl}/${pessoaId}`)
  }

  atualizar(pessoaId: number, pessoa: Pessoa) {
    return this.http.put(`${this.baseUrl}/${pessoaId}`, pessoa)
  }
}

export interface PessoaFilter {
  nome: string
  page: number
  size: number
}
