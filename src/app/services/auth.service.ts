import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = '';

  constructor(private http: HttpClient) {}

  // Método para realizar login e obter o token JWT
  login(username: string, password: string): Observable<boolean> {
    const loginData = {
      login: username,
      password: password
    };

    // Substitua a URL pelo endpoint da API de login fornecido pelo cURL
    return this.http.post<any>('http://localhost:3000/auth/login', loginData).pipe(
      tap((response) => {
        // Se a resposta da API contiver o token JWT, armazene-o e defina o estado de autenticação como verdadeiro
        if (response.token) {
          this.token = response.token;
          // Armazene o token no localStorage (opcional)
          localStorage.setItem('accessToken', this.token);
        }
      }),
      map((response) => !!response.token), // Retorna true se o token existir e false se não existir
      catchError((error) => {
        console.log('Erro ao realizar o login:', error);
        return of(false);
      })
    );
  }



  // Método para realizar logout e limpar o estado de autenticação e o token
  logout(): void {
    localStorage.setItem('accessToken', '');
  }

  // Método para obter o token JWT
  getToken(): string {
    return localStorage.getItem('accessToken') || '';
  }
}
