import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private baseUrl = "http://localhost:3000/categorias"
  constructor(private http: HttpClient) {
  }

  public listar() {
    return this.http.get(this.baseUrl)
  }
}
