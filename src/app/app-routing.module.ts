import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

const routes: Routes = [
  {path: '', component: PessoasPesquisaComponent},
  {path: 'pessoa-pesquisa', component: PessoasPesquisaComponent},
  {path: 'pessoa-cadastro', component: PessoasCadastroComponent},
  {path: 'lancamento-pesquisa', component: LancamentosPesquisaComponent},
  {path: 'lancamento-cadastro', component: LancamentoCadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
