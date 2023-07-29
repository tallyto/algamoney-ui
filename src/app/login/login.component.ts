import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      (loginSuccess) => {
        if (loginSuccess) {
          console.log('Login realizado com sucesso!');
          // Redirecionar para a página de pesquisa de pessoas após o login bem-sucedido
          this.router.navigate(['/lancamentos']);
        } else {
          console.log('Credenciais inválidas. Tente novamente.');
          // Realizar alguma ação apropriada para tratar o login sem sucesso, se necessário.
        }
      },
      (error) => {
        console.log('Erro ao realizar o login:', error);
        // Lidar com os erros de autenticação aqui, se necessário.
      }
    );
  }
}
