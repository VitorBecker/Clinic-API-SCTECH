import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';

const usersService = new UsersService();

export class UsersController {
  async cadastrar(req: Request, res: Response) {
    try {
      const { nome, email, senha, role } = req.body;
      const usuario = await usersService.cadastrar({ nome, email, senha, role });
      return res.status(201).json(usuario);
    } catch (error: any) {
      return res.status(400).json({ mensagem: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const resultado = await usersService.login({ email, senha });
      return res.status(200).json(resultado);
    } catch (error: any) {
      // Retorna 401 para credenciais inválidas sem detalhar qual campo errou
      return res.status(401).json({ mensagem: error.message });
    }
  }
}