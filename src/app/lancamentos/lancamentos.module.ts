import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LancamentoCadastroComponent} from "./lancamento-cadastro/lancamento-cadastro.component";
import {LancamentosPesquisaComponent} from "./lancamentos-pesquisa/lancamentos-pesquisa.component";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {SelectButtonModule} from "primeng/selectbutton";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SharedModule} from "../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {LancamentoService} from "./lancamento.service";
import {MessageModule} from "primeng/message";
import {PaginatorModule} from "primeng/paginator";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ],
    imports: [
        CommonModule,
        ButtonModule,
        TableModule,
        TooltipModule,
        SelectButtonModule,
        CalendarModule,
        FormsModule,
        InputNumberModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        SharedModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MessageModule,
        PaginatorModule,
        ToastModule
    ],
  exports: [
  ],
  providers: [LancamentoService, MessageService]
})
export class LancamentosModule { }
