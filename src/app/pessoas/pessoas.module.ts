import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PessoasPesquisaComponent} from "./pessoas-pesquisa/pessoas-pesquisa.component";
import {PessoasCadastroComponent} from "./pessoas-cadastro/pessoas-cadastro.component";
import {ButtonModule} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {SelectButtonModule} from "primeng/selectbutton";
import {InputMaskModule} from "primeng/inputmask";
import {InputTextModule} from "primeng/inputtext";
import {SharedModule} from "../shared/shared.module";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";



@NgModule({
  declarations: [
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
        InputMaskModule,
        InputTextModule,
        SharedModule,
        ToastModule
    ],
  providers: [MessageService]
})
export class PessoasModule { }
