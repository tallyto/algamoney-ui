import { NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TabViewModule} from "primeng/tabview";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {LancamentosPesquisaComponent} from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import {NavbarComponent} from './navbar/navbar.component';
import {PessoasPesquisaComponent} from './pessoas-pesquisa/pessoas-pesquisa.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import {InputTextareaModule} from "primeng/inputtextarea";

@NgModule({
  declarations: [
    AppComponent,
    LancamentosPesquisaComponent,
    NavbarComponent,
    PessoasPesquisaComponent,
    LancamentoCadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    FormsModule,
    CommonModule,
    InputTextareaModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
