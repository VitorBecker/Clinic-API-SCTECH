import { userRepository } from '../repositories/UsersRepository';
<<<<<<< HEAD
import { Usuario, UserarioRole } from '../entities/users';
=======
import { Usuario, UsuarioRole } from '../entities/users';
>>>>>>> feat/rbac
import { gerarHash, compararHash } from '../utils/bcripto';
import { gerarToken } from '../utils/jwt';

interface ICadastroUsuario {
  nome: string;
  email: string;
  senha: string;
<<<<<<< HEAD
  role?: UserarioRole;
=======
  role?: UsuarioRole;
>>>>>>> feat/rbac
}

interface ILoginUsuario {
  email: string;
  senha: string;
}

export class UsersService {
  // Cadastro de Usuário
  async cadastrar({ nome, email, senha, role }: ICadastroUsuario) {
    // 1. Validar preenchimento dos campos obrigatórios
    if (!nome || !email || !senha) {
      throw new Error('Todos os campos obrigatórios devem ser preenchidos');
    }

    // 2. Verificar se e-mail já está em uso (duplicidade)
    const usuarioExiste = await userRepository.findOneBy({ email });
    if (usuarioExiste) {
      throw new Error('E-mail já cadastrado');
    }

    // 3. Criptografar a senha do usuário
    const senhaHash = await gerarHash(senha);

    // 4. Criar e salvar o novo usuário
    const novoUsuario = userRepository.create({
      nome,
      email,
      senha: senhaHash,
<<<<<<< HEAD
      role: role || UserarioRole.PACIENTE,
=======
      role: role || UsuarioRole.PACIENTE,
>>>>>>> feat/rbac
    });

    await userRepository.save(novoUsuario);

    // Retorna os dados omitindo a hash da senha por segurança
    const { senha: _, ...usuarioSemSenha } = novoUsuario;
    return usuarioSemSenha;
  }

  // Autenticação de Usuário (Login)
  async login({ email, senha }: ILoginUsuario) {
    if (!email || !senha) {
      throw new Error('Credenciais inválidas');
    }

    // Busca o usuário pelo e-mail
    const usuario = await userRepository.findOneBy({ email });
    if (!usuario) {
      throw new Error('Credenciais inválidas');
    }

    // Compara a senha informada com a hash salva no banco
    const senhaValida = await compararHash(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error('Credenciais inválidas');
    }

    // Gera o token JWT com o id e role do usuário
    const token = gerarToken({
      id: usuario.id,
      role: usuario.role,
    });

    return { token };
  }
}