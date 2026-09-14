import { Request, Response, NextFunction } from 'express';
import { UsuarioRole } from '../entities/users';

export function roleMiddleware(...rolesPermitidas: UsuarioRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const usuario = req.usuario;

    if (!usuario) {
      return res.status(401).json({ mensagem: 'Usuário não autenticado' });
    }

    if (!rolesPermitidas.includes(usuario.role)) {
      return res.status(403).json({
        mensagem: 'Você não tem permissão para acessar este recurso',
      });
    }

    return next();
  };
}