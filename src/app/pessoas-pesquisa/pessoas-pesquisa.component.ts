import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
  public pessoa: Pessoa[] = [
    { nome: "João", cidade: "São Paulo", estado: "SP", status: true },
    { nome: "Maria", cidade: "Rio de Janeiro", estado: "RJ", status: true },
    { nome: "Pedro", cidade: "Belo Horizonte", estado: "MG", status: false },
    { nome: "Ana", cidade: "Porto Alegre", estado: "RS", status: true },
    { nome: "Lucas", cidade: "Salvador", estado: "BA", status: true },
    { nome: "Carla", cidade: "Fortaleza", estado: "CE", status: false },
    { nome: "Fernando", cidade: "Recife", estado: "PE", status: true },
    { nome: "Mariana", cidade: "Curitiba", estado: "PR", status: true },
    { nome: "Rodrigo", cidade: "Brasília", estado: "DF", status: false },
    { nome: "Camila", cidade: "Manaus", estado: "AM", status: true },
    { nome: "Gustavo", cidade: "Belém", estado: "PA", status: true },
    { nome: "Larissa", cidade: "Vitória", estado: "ES", status: false },
    { nome: "Rafael", cidade: "Porto Velho", estado: "RO", status: true },
    { nome: "Amanda", cidade: "Goiânia", estado: "GO", status: true },
    { nome: "Diego", cidade: "Natal", estado: "RN", status: false },
    { nome: "Patrícia", cidade: "Florianópolis", estado: "SC", status: true }
  ];
}

interface Pessoa {
  nome: string;
  cidade: string;
  estado: string;
  status: boolean;
}
