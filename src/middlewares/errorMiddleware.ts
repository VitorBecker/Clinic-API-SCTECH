import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ mensagem: err.message });
    return;
  }

  console.error('[ERRO INESPERADO]', err);
  res.status(500).json({ mensagem: 'Erro interno do servidor' });
}