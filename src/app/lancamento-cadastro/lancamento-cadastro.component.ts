import { Component } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent {
  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ]

  categorias = [
    {label: "Alimentacao", value: 1},
    {label: "Transporte", value: 2}
  ]

  pessoas = [
    {label: "Tállyto", value: 1},
    {label: "Yves", value: 2},
    {label: "Gustavo", value: 3}
  ]

  constructor() {
  }
}
