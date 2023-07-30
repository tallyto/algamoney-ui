import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private baseUrl = `${environment.apiUrl}/categorias`
  constructor(private http: HttpClient) {
  }

  public listar() {
    return this.http.get(this.baseUrl)
  }
}
