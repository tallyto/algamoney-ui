import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LancamentosPesquisaComponent} from "./lancamentos-pesquisa/lancamentos-pesquisa.component";
import {LancamentoCadastroComponent} from "./lancamento-cadastro/lancamento-cadastro.component";
import {authGuard} from "../security/auth.guard";

const routes: Routes = [
  { path: 'lancamentos', component: LancamentosPesquisaComponent, canActivate: [authGuard] },
  { path: 'lancamentos/:id', component: LancamentoCadastroComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
