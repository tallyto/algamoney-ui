import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {concatMap, concatWith, tap} from 'rxjs/operators';
import { CategoriasService } from '../../categorias/categorias.service';
import { PessoasService } from '../../pessoas/pessoas.service';
import { LancamentoService } from '../lancamento.service';
import { Lancamento } from '../../entities/lancamento/lancamento.model';
import { Title } from '@angular/platform-browser';
import {Observable} from "rxjs";

const SUCCESS_MESSAGE = { severity: 'success', summary: 'Sucesso', detail: 'Lançamento cadastrado com sucesso!' };
const UPDATE_SUCCESS_MESSAGE = { severity: 'success', summary: 'Sucesso', detail: 'Lançamento atualizado com sucesso!' };

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {
  private lancamentoId: number | null = null;
  lancamento: Lancamento = new Lancamento();
  categorias: any[] = [];
  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];
  pessoas: any[] = [];
  formLancamento!: FormGroup;

  constructor(
    private categoriasService: CategoriasService,
    private pessoasService: PessoasService,
    private formBuilder: FormBuilder,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.formLancamento = this.getLancamentoFormBuilder();

    this.route.params.subscribe(params => {
      this.handleRouteParams(params);
    });

    this.loadCategorias();
    this.loadPessoas();
    this.handlerTitle()
  }

  public isNew() {
    return this.lancamentoId === null;
  }

  private handlerTitle() {
    this.isNew() ? this.title.setTitle('Cadastro de Lançamento') : this.title.setTitle('Edição de Lançamento')
  }

  private handleRouteParams(params: any): void {
    const id = params['id'];
    if (id === 'new') {
      this.lancamentoId = null;
      this.formLancamento.patchValue(new Lancamento());
    } else {
      this.lancamentoId = +id;
      this.loadLancamentoData(this.lancamentoId);
    }
  }

  private loadLancamentoData(id: number): void {
    this.lancamentoService.buscarPorId(id).subscribe({
      next: (lancamentoApiData) => {
        this.lancamento = Lancamento.toDTO(lancamentoApiData);
        this.formLancamento.patchValue(this.lancamento);
      }
    });
  }

  private getLancamentoFormBuilder(): FormGroup {
    return this.formBuilder.group({
      codigo: ['', []],
      descricao: ['', []],
      dataVencimento: ['', [Validators.required]],
      dataPagamento: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      observacao: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      pessoa: ['', [Validators.required]],
    });
  }

  private loadCategorias(): void {
    this.categoriasService.listar().subscribe({
      next: (value: any) => {
        this.categorias = value.map((categoria: Categoria) => {
          return {
            label: categoria.nome,
            value: categoria.codigo
          };
        });

        this.setCategoria()
      }
    });
  }

  private setCategoria() {
    if (this.lancamento.categoria) {
      this.formLancamento.patchValue({
        categoria: this.lancamento.categoria.codigo
      });
    }
  }

  private loadPessoas(): void {
    this.pessoasService.listar().subscribe({
      next: (value: any) => {
        this.pessoas =  value.content.map((pessoa: Pessoa) => {
          return {
            label: pessoa.nome,
            value: pessoa.codigo
          };
        });
        this.setPessoa()
      }
    });
  }

  private setPessoa() {
    if (this.lancamento.pessoa) {
      this.formLancamento.patchValue({
        pessoa: this.lancamento.pessoa.codigo
      });
    }
  }

  onSave() {
    if (this.formLancamento.valid) {
      const lancamento = Lancamento.fromDTO(this.formLancamento.value);
      if (this.lancamentoId === null) {
        this.saveNewLancamento(lancamento);
      } else {
        this.updateLancamento(this.lancamentoId, lancamento);
      }
    }
  }

  private saveNewLancamento(lancamento: any): void {
    this.lancamentoService.criar(lancamento).subscribe({
      next: (lancamentoAdicionado: any) => {
        this.messageService.add(SUCCESS_MESSAGE);
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      }
    });
  }

  private updateLancamento(id: number, lancamento: any): void {
    this.lancamentoService.atualizar(id, lancamento).subscribe({
      next: (lancamentoAtualizado) => {
        this.messageService.add(UPDATE_SUCCESS_MESSAGE);
        this.lancamento = Lancamento.toDTO(lancamentoAtualizado);
        this.formLancamento.patchValue(this.lancamento);
        this.setPessoa()
        this.setCategoria()
      }
    });
  }

  goBack() {
    this.router.navigate(['../']);
  }

  newLancamento() {
    this.formLancamento.reset();
    this.router.navigate(['/lancamentos', 'new']);
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
