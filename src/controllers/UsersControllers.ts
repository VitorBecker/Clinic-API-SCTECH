import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../services/UsersService';


const usersService = new UsersService();

// classe de controle para rotas e cadastro de usuarios
export class UsersController {
  async cadastrar(req: Request, res: Response, next: NextFunction) {
    try {
      const { nome, email, senha, role } = req.body || {};
      const usuario = await usersService.cadastrar({ nome, email, senha, role });
      return res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, senha } = req.body || {};
      const resultado = await usersService.login({ email, senha });
      return res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  }
}
