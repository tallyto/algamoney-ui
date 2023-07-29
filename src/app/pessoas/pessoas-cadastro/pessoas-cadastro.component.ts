import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent {
  constructor(private router: Router) {
  }

  goBack() {
    this.router.navigate(['../']);
  }
}
