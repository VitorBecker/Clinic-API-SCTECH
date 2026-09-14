import { UsuarioRole } from '../entities/users';

// DTO de entrada: formato aceito pela rota POST /auth/register.
export class cadastroUsersDTO {
  nome!: string;
  email!: string;
  senha!: string;
  role?: UsuarioRole;
}