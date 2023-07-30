import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PessoasPesquisaComponent} from './pessoas-pesquisa/pessoas-pesquisa.component';
import {PessoasCadastroComponent} from './pessoas-cadastro/pessoas-cadastro.component';
import {AuthGuard } from "../security/auth.guard";

const routes: Routes = [
  {path: 'pessoas', component: PessoasPesquisaComponent, canActivate: [AuthGuard]},
  {path: 'pessoas/:id', component: PessoasCadastroComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule {
}
