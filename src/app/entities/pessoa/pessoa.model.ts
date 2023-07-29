import {Endereco} from "../endereco/endereco.model";

export class Pessoa {
  codigo: number;
  nome: string;
  ativo: true
  endereco: Endereco;

  static fromDTO(dto: any): Pessoa {
    const pessoa = new Pessoa();
    pessoa.codigo = dto.codigo;
    pessoa.nome = dto.nome;
    pessoa.ativo = true;

    // Mapear o endereço
    pessoa.endereco = Endereco.fromDTO(dto);

    return pessoa;
  }
}
