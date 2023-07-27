import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ErroHandlerService {

  constructor(
    private messageService: MessageService
  ) { }

  handler(errorResponse: any) {
    const severity = 'error';
    const summary = 'Error';
    let detail = 'An unexpected error occurred.';

    if (errorResponse && errorResponse.status) {
      const httpStatus = errorResponse.status;

      // Defina mensagens específicas para cada código de status HTTP
      switch (httpStatus) {
        case 400:
          detail = 'Error 400: The server could not understand the request.';
          break;
        case 401:
          detail = 'Error 401: You are not authorized to access this resource.';
          break;
        case 404:
          detail = 'Error 404: The requested resource was not found.';
          break;
        // Adicione mais casos para outros códigos de status HTTP, se necessário
        default:
          detail = 'An unexpected error occurred.';
      }
    }

    this.messageService.add({ severity, summary, detail });
  }

}
