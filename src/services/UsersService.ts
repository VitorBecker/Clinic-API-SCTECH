import { userRepository } from '../repositories/UsersRepository';
import { UsuarioRole } from '../entities/users';
import { gerarHash, compararHash } from '../utils/bcripto';
import { gerarToken } from '../utils/jwt';
import { AppError } from '../errors/AppError';
import { cadastroUsersDTO } from '../dtos/cadastroUsersDTO';
import { loginUsersDTO } from '../dtos/loginUsersDTO';
import { usersResponseDTO } from '../dtos/usersResponseDTO';
import { loginResponseDTO } from '../dtos/loginResponseDTO';

/* interface ICadastroUsuario {
  nome: string;
  email: string;
  senha: string;
  role?: UsuarioRole;
}

interface ILoginUsuario {
  email: string;
  senha: string;
} */


// classe de autenticação e cadastro de usuários
export class UsersService {
  // Cadastro de Usuário
  // async cadastrar({ nome, email, senha, role }: ICadastroUsuario) {
  async cadastrar(dados: cadastroUsersDTO): Promise<usersResponseDTO> {
    const { nome, email, senha, role } = dados;

    
    // Validar preenchimento dos campos obrigatórios
    if (!nome || !email || !senha) {
      throw new AppError('Todos os campos obrigatórios devem ser preenchidos', 400);
    }

    // Verificar se e-mail já está em uso (duplicidade)
    // const usuarioExiste = await userRepository.findOneBy({ email });
    const usuarioExiste = await userRepository.buscarPorEmail(email);

    if (usuarioExiste) {
      throw new AppError('E-mail já cadastrado', 409);
    }

    // Criptografar a senha do usuário
    const senhaHash = await gerarHash(senha);

    // Criar e salvar o novo usuário
    const novoUsuario = await userRepository.criar({
      nome,
      email,
      senha: senhaHash,
      role: role || UsuarioRole.ATENDENTE,
    });

    return new usersResponseDTO(novoUsuario);
  }

  // Autenticação de Usuário (Login)
  async login(dados: loginUsersDTO): Promise<loginResponseDTO> {
    const { email, senha } = dados;

    if (!email || !senha) {
      throw new AppError('Credenciais inválidas', 401);
    }

    // Busca o usuário pelo e-mail
    const usuario = await userRepository.buscarPorEmail(email);
    if (!usuario) {
      throw new AppError('Credenciais inválidas', 401);
    }

    // Compara a senha informada com a hash salva no banco
    const senhaValida = await compararHash(senha, usuario.senha);
    if (!senhaValida) {
      throw new AppError('Credenciais inválidas', 401);
    }

    // Gera o token JWT com o id e role do usuário
    const token = gerarToken({
      id: usuario.id,
      role: usuario.role,
    });

    return new loginResponseDTO(token);
  }

  // Busca o usuário completo a partir do id presente no token (RF10 - GET /users/me)
  async buscarPorId(id: string): Promise<usersResponseDTO> {
    
    const usuario = await userRepository.buscarPorId(id);

    if (!usuario) {
      throw new AppError('Usuário não encontrado', 401);
    }

    return new usersResponseDTO(usuario);
  }
}
