import {Component, OnInit} from '@angular/core';
import {CategoriasService} from "../../categorias/categorias.service";
import {PessoasService} from "../../pessoas/pessoas.service";

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit{

  categorias = []

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ]

  pessoas = []

  constructor(
    private categoriasService: CategoriasService,
    private pessoasService: PessoasService
  ) {

  }

  private handlerCategorias() {
    this.categoriasService.listar().subscribe({
      next: (value: any) => {
        this.categorias = value.map((categoria: Categoria) => {
          return {
            label: categoria.nome,
            value: categoria.codigo
          }
        });
      }
    })
  }

  private handlerPessoas() {
    this.pessoasService.listar().subscribe({
      next: (value: any) => {
        this.pessoas =  value.content.map((pessoa: Pessoa) => {
          return {
            label: pessoa.nome,
            value: pessoa.codigo
          }
        })
      }
    })
  }

  ngOnInit(): void {
    this.handlerCategorias()
    this.handlerPessoas()
  }
}

interface Categoria {
  codigo: number;
  nome: string;
}

interface Pessoa {
  codigo: number;
  nome: string;
}
