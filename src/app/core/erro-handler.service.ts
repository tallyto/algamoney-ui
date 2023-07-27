import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ErroHandlerService {

  constructor(
    private messageService: MessageService
  ) { }

  handler(errorResponse: any){
    const msg = errorResponse.error[0].userMessage
    this.messageService.add({severity: 'error', summary: 'Error', detail: msg})

  }
}
