import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isTokenExpired()) {
      window.alert('Acesso Negado, É Necessário Fazer Login Para Acessar Esta Página!');
      return this.router.parseUrl('login'); // Redireciona para a rota 'login'
    }

    // Verifica se a rota requer uma lista de roles específicas
    const requiredRoles = next.data['roles'] as string[];

    if (!requiredRoles || requiredRoles.length === 0) {
      // Se a rota não requer uma lista de roles específicas, permite o acesso
      return true;
    }

    // Verifica se o usuário possui alguma das roles necessárias
    const userRole = this.authService.getRole();

    if (!userRole) {
      // Se o usuário não possui uma role, redireciona para a página de "Não Autorizado"
      return this.router.parseUrl('not-authorized');
    }

    const hasRequiredRole = requiredRoles.some(role => role === userRole);

    if (!hasRequiredRole) {
      // Se o usuário não possui nenhuma das roles necessárias, redireciona para a página de "Não Autorizado"
      return this.router.parseUrl('not-authorized');
    }

    // Se o usuário possui pelo menos uma das roles necessárias, permite o acesso à rota protegida.
    return true;
  }
}
