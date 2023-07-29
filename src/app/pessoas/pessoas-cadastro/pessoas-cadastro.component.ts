import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PessoasService} from "../pessoas.service";
import {MessageService} from "primeng/api";
import {Pessoa} from "../../entities/pessoa/pessoa.model";

const SUCCESS_MESSAGE = {severity: 'success', summary: 'Sucesso', detail: 'Pessoa salva com sucesso!'};

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {
  public formPessoa: FormGroup
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private pessoaService: PessoasService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
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
    this.router.navigate(['../']);
  }

  onSave() {
    if(this.formPessoa.valid) {
      const pessoa = Pessoa.fromDTO(this.formPessoa.value)
      this.pessoaService.inserir(pessoa).subscribe({
        next: () => {
          this.formPessoa.reset()
          this.messageService.add(SUCCESS_MESSAGE)
        }
      })
    }
  }
}


