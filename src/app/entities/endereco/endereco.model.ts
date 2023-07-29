export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;

  static fromDTO(dto: any): Endereco {
    const endereco = new Endereco();

    // Mapear o endereço

    endereco.logradouro = dto.logradouro;
    endereco.numero = dto.numero;
    endereco.complemento = dto.complemento;
    endereco.bairro = dto.bairro;
    endereco.cep = dto.cep;
    endereco.cidade = dto.cidade;
    endereco.estado = dto.estado;

    return endereco;
  }
}
