import {Component, OnInit} from '@angular/core';
import {CategoriasService} from "../../categorias/categorias.service";

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

  pessoas = [
    {label: "Tállyto", value: 1},
    {label: "Yves", value: 2},
    {label: "Gustavo", value: 3}
  ]

  constructor(private categoriasService: CategoriasService) {

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

  ngOnInit(): void {
    this.handlerCategorias()
  }
}

interface Categoria {
  codigo: number;
  nome: string;
}
