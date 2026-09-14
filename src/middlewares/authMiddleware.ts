import { Request, Response, NextFunction } from 'express';
import { verificarToken, TokenPayload } from '../utils/jwt';

// Estende a interface Request do Express para anexar o usuario autenticado
declare global {
  namespace Express {
    interface Request {
      usuario?: TokenPayload;
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token de autenticação não informado' });
  }

  // Checar o formato esperado, deve ser "Bearer <TOKEN>"
  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ mensagem: 'Formato do token inválido' });
  }

  const token = parts[1];

  try {
    const decoded = verificarToken(token);
    req.usuario = decoded; // Anexa o id e a role no req.usuario
    return next();
  } catch (error) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
}