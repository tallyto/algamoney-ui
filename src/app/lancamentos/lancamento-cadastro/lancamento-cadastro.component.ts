import {Component, OnInit} from '@angular/core';
import {CategoriasService} from "../../categorias/categorias.service";
import {PessoasService} from "../../pessoas/pessoas.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LancamentoService} from "../lancamento.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {Lancamento} from "../../entities/lancamento/lancamento.model";

const SUCCESS_MESSAGE = {severity: 'success',
  summary: 'Sucesso', detail: 'Lançamento cadastrado com sucesso!'};

const UPDATE_SUCCESS_MESSAGE = {severity: 'success',
  summary: 'Sucesso', detail: 'Lançamento atualizado com sucesso!'};

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {
  private lancamentoId: number | null = null;
  lancamento: Lancamento = new Lancamento();
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
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id === 'new') {
        // Nova pessoa, não há ID
        this.lancamentoId = null;
      } else {
        // Edição de pessoa, temos um ID
        this.lancamentoId = +id;
        // Carregar os dados da pessoa com ID this.pessoaId e preencher o formulário
        // Por exemplo:
        this.lancamentoService.buscarPorId(this.lancamentoId).subscribe({
          next: (lancamentoApiData) => {
            // Converta os dados da API para o formato do formulário usando toDTO
            this.lancamento = Lancamento.toDTO(lancamentoApiData);
            this.formLancamento.patchValue(this.lancamento);
          }
        });
      }
    });
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

        // Verificar se existe uma categoria no lançamento atual
        if (this.lancamento.categoria) {
          // Preencher o campo de categoria no formulário com a categoria correta
          this.formLancamento.patchValue({
            categoria: this.lancamento.categoria.codigo
          });
        }
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
        // Verificar se existe uma pessoa no lançamento atual
        if (this.lancamento.pessoa) {
          // Preencher o campo de pessoa no formulário com a pessoa correta
          this.formLancamento.patchValue({
            pessoa: this.lancamento.pessoa.codigo
          });
        }
      }
    })
  }

  onSave() {
    if (this.formLancamento.valid) {
      const lancamento = Lancamento.fromDTO(this.formLancamento.value)
      if (this.lancamentoId === null) {
        this.lancamentoService.criar(lancamento).subscribe({
          next: () => {
            this.formLancamento.reset()
            this.messageService.add(SUCCESS_MESSAGE)
            this.goBack()
          }
        })
      } else {
        this.lancamentoService.atualizar(this.lancamentoId, lancamento).subscribe({
          next: () => {
            this.messageService.add(UPDATE_SUCCESS_MESSAGE)
            this.formLancamento.reset()
            this.goBack()
          }
        })
      }
    }
  }



  goBack() {
    this.router.navigate(['../']);
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
