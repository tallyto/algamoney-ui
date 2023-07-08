import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PessoasGridComponent} from "./pessoas-grid/pessoas-grid.component";
import {PessoasPesquisaComponent} from "./pessoas-pesquisa/pessoas-pesquisa.component";
import {PessoasCadastroComponent} from "./pessoas-cadastro/pessoas-cadastro.component";
import {ButtonModule} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {SelectButtonModule} from "primeng/selectbutton";
import {SharedModule} from "primeng/api";
import {InputMaskModule} from "primeng/inputmask";
import {MessageModule} from "../message/message.module";
import {InputTextModule} from "primeng/inputtext";



@NgModule({
  declarations: [
    PessoasGridComponent,
    PessoasPesquisaComponent,
    PessoasCadastroComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    FormsModule,
    SelectButtonModule,
    SharedModule,
    InputMaskModule,
    MessageModule,
    InputTextModule
  ]
})
export class PessoasModule { }
