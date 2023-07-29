import {Endereco} from "../endereco/endereco.model";

export class Pessoa {
  codigo: number;
  nome: string;
  ativo: true
  endereco: Endereco;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;


  static fromDTO(dto: any): Pessoa {
    const pessoa = new Pessoa();
    pessoa.codigo = dto.codigo;
    pessoa.nome = dto.nome;
    pessoa.ativo = true;

    // Mapear o endereço
    pessoa.endereco = Endereco.fromDTO(dto);

    return pessoa;
  }

  static toDTO(dto: any): Pessoa {
    const pessoa = new Pessoa();
    pessoa.codigo = dto.codigo;
    pessoa.nome = dto.nome;
    pessoa.ativo = true;
    Object.assign(pessoa, dto.endereco)

    return pessoa

  }
}
