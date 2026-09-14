import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../services/UsersService';
import { cadastroUsersDTO } from '../dtos/cadastroUsersDTO';
import { loginUsersDTO } from '../dtos/loginUsersDTO';


const usersService = new UsersService();

// classe de controle para rotas e cadastro de usuarios
export class UsersController {
  async cadastrar(req: Request, res: Response, next: NextFunction) {
    try {
      // const { nome, email, senha, role } = req.body || {};
      // const usuario = await usersService.cadastrar({ nome, email, senha, role });
      const dados: cadastroUsersDTO = req.body || {};
      const usuario = await usersService.cadastrar(dados);
      return res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // const { email, senha } = req.body || {};
      // const resultado = await usersService.login({ email, senha });
      const dados: loginUsersDTO = req.body || {};
      const resultado = await usersService.login(dados);
      return res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  }
  
  // GET /users/me - retorna os dados completos do usuário autenticado
  // (busca no banco a partir do id contido no token, não apenas o payload)
  async meuPerfil(req: Request, res: Response, next: NextFunction) {
    try {
      const usuario = await usersService.buscarPorId(req.usuario!.id);
      return res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  // GET /users/admin - rota restrita ao perfil ADMINISTRADOR (RBAC) 
  async acessoAdministrativo(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        mensagem: 'Acesso ao painel administrativo concedido',
        usuarioLogado: req.usuario,
      });
    } catch (error) {
      next(error);
    }
  }
}
