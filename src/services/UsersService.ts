import { userRepository } from '../repositories/UsersRepository';
import { Usuario, UsuarioRole } from '../entities/users';
import { gerarHash, compararHash } from '../utils/bcripto';
import { gerarToken } from '../utils/jwt';
import { AppError } from '../errors/AppError';

interface ICadastroUsuario {
  nome: string;
  email: string;
  senha: string;
  role?: UsuarioRole;
}

interface ILoginUsuario {
  email: string;
  senha: string;
}

// classe de autenticação e cadastro de usuários
export class UsersService {
  // Cadastro de Usuário
  async cadastrar({ nome, email, senha, role }: ICadastroUsuario) {
    // Validar preenchimento dos campos obrigatórios
    if (!nome || !email || !senha) {
      throw new AppError('Todos os campos obrigatórios devem ser preenchidos', 400);
    }
    // Verificar se e-mail já está em uso (duplicidade)
    const usuarioExiste = await userRepository.findOneBy({ email });
    if (usuarioExiste) {
      throw new AppError('E-mail já cadastrado', 409);
    }

    // Criptografar a senha do usuário
    const senhaHash = await gerarHash(senha);

    // Criar e salvar o novo usuário
    const novoUsuario = userRepository.create({
      nome,
      email,
      senha: senhaHash,
      role: role || UsuarioRole.PACIENTE,
    });

    await userRepository.save(novoUsuario);

    // Retorna os dados omitindo a hash da senha por segurança
    const { senha: _, ...usuarioSemSenha } = novoUsuario;
    return usuarioSemSenha;
  }

  // Autenticação de Usuário (Login)
  async login({ email, senha }: ILoginUsuario) {
    if (!email || !senha) {
      throw new AppError('Credenciais inválidas', 401);
    }

    // Busca o usuário pelo e-mail
    const usuario = await userRepository.findOneBy({ email });
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

    return { token };
  }
}