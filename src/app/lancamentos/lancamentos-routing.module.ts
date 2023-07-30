import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LancamentosPesquisaComponent} from "./lancamentos-pesquisa/lancamentos-pesquisa.component";
import {LancamentoCadastroComponent} from "./lancamento-cadastro/lancamento-cadastro.component";
import {AuthGuard } from "../security/auth.guard";

const routes: Routes = [
  { path: 'lancamentos', component: LancamentosPesquisaComponent, canActivate: [AuthGuard] , data: {
      roles: ["user", "admin"]
    } },
  { path: 'lancamentos/:id', component: LancamentoCadastroComponent, canActivate: [AuthGuard], data: {
    roles: ["admin"]
    }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
