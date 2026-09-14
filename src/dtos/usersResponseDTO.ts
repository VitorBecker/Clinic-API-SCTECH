import { Usuario, UsuarioRole } from '../entities/users';

// DTO de saída: centraliza a "tradução" da entidade para a resposta pública,
// garantindo que a senha (hash) nunca seja serializada.
export class usersResponseDTO {
  id: string;
  nome: string;
  email: string;
  role: UsuarioRole;
  criadoEm: Date;

  constructor(usuario: Usuario) {
    this.id = usuario.id;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.role = usuario.role;
    this.criadoEm = usuario.criadoEm;
  }
}