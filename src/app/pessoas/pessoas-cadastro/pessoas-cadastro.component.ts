import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PessoasService} from "../pessoas.service";
import {MessageService} from "primeng/api";
import {Pessoa} from "../../entities/pessoa/pessoa.model";

const SAVE_SUCCESS_MESSAGE = {severity: 'success', summary: 'Sucesso', detail: 'Pessoa salva com sucesso!'};
const UPDATE_SUCCESS_MESSAGE = {severity: 'success', summary: 'Sucesso', detail: 'Pessoa atualizada com sucesso!'};

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {
  pessoaId: number | null = null; // Variável para armazenar o ID da pessoa (se houver)
  public formPessoa: FormGroup
  pessoa = new Pessoa()
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private pessoaService: PessoasService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id === 'new') {
        // Nova pessoa, não há ID
        this.pessoaId = null;
      } else {
        // Edição de pessoa, temos um ID
        this.pessoaId = +id;
        // Carregar os dados da pessoa com ID this.pessoaId e preencher o formulário
        // Por exemplo:
        this.pessoaService.buscarPorId(this.pessoaId).subscribe({
          next: (pessoa) => {
            this.pessoa = Pessoa.toDTO(pessoa)
            this.formPessoa.patchValue(this.pessoa);
          }
        });
      }
    });
    this.formPessoa = this.getPessoaFormBuilder()
  }

  getPessoaFormBuilder(){
    const formBuilder = this.formBuilder.group({
      codigo: ['', []],
      nome: ['', [Validators.required]],
      ativo: ['', []],
      logradouro: ['', []],
      numero: ['', []],
      complemento: ['', []],
      bairro: ['', []],
      cep: ['', []],
      cidade: ['', []],
      estado: ['', []],
    })

    return formBuilder
  }

  goBack() {
    this.router.navigate(['pessoas']);
  }

  onSave() {
    if (this.formPessoa.valid) {
      const pessoa = Pessoa.fromDTO(this.formPessoa.value)
      if (this.pessoaId === null) {
        this.pessoaService.inserir(pessoa).subscribe({
          next: (pessoa: any) => {
            this.messageService.add(SAVE_SUCCESS_MESSAGE)
            this.router.navigate(['pessoas', pessoa.codigo])
          }
        })
      } else {
        this.pessoaService.atualizar(this.pessoaId, pessoa).subscribe({
          next: (pessoa: any) => {
            this.messageService.add(UPDATE_SUCCESS_MESSAGE)
            this.router.navigate(['pessoas', pessoa.codigo])
          }
        })
      }
    }
  }

  newPessoa() {
    this.formPessoa.reset()
    this.formPessoa.patchValue(new Pessoa())
    this.router.navigate(['pessoas', 'new']);
  }
}


