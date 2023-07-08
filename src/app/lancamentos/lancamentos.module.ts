import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';
import {LancamentoCadastroComponent} from "./lancamento-cadastro/lancamento-cadastro.component";
import {LancamentosPesquisaComponent} from "./lancamentos-pesquisa/lancamentos-pesquisa.component";
import {ButtonModule} from "primeng/button";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {SelectButtonModule} from "primeng/selectbutton";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {DropdownModule} from "primeng/dropdown";
import {MessageModule} from "../message/message.module";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";

@NgModule({
  declarations: [
    LancamentosGridComponent,
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    SharedModule,
    TableModule,
    TooltipModule,
    SelectButtonModule,
    CalendarModule,
    FormsModule,
    InputNumberModule,
    DropdownModule,
    MessageModule,
    InputTextModule,
    InputTextareaModule
  ],
  exports: [
    LancamentosGridComponent
  ]
})
export class LancamentosModule { }
