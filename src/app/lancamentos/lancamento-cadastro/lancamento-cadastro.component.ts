import {Component, OnInit} from '@angular/core';
import {CategoriasService} from "../../categorias/categorias.service";
import {PessoasService} from "../../pessoas/pessoas.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LancamentoService} from "../lancamento.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

const SUCCESS_MESSAGE = {severity: 'success',
  summary: 'Sucesso', detail: 'Lançamento cadastrado com sucesso!'};

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  categorias = []

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ]

  pessoas = []

  formLancamento: FormGroup;

  constructor(
    private categoriasService: CategoriasService,
    private pessoasService: PessoasService,
    private formBuilder: FormBuilder,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.formLancamento = this.getLancamentoFormBuilder()
    this.handlerCategorias()
    this.handlerPessoas()
  }

  getLancamentoFormBuilder(){
    const formBuilder = this.formBuilder.group({
      codigo: ['', []],
      descricao: ['', []],
      dataVencimento: ['', [Validators.required]],
      dataPagamento: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      observacao: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      pessoa: ['', [Validators.required]],
    })

    return formBuilder
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

  onSave() {
    if(this.formLancamento.valid) {
        this.lancamentoService.criar(this.formLancamento.value).subscribe({
          next: () => {
            this.messageService.add(SUCCESS_MESSAGE)
            this.formLancamento.reset()
          }
        })
    }
  }

  goBack() {
    this.router.navigate(['/lancamento-pesquisa']);
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
