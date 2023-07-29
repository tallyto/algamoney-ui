import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorMessageComponent} from "./message/error-message.component";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ErrorMessageComponent
  ]
})
export class SharedModule { }
