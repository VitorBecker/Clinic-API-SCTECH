import jwt from 'jsonwebtoken';
import { UsuarioRole } from '../entities/users';

// Interface do Payload que será guardado dentro do Token
export interface TokenPayload {
  id: string;
  role: UsuarioRole;
}


const JWT_SECRET = process.env.JWT_SECRET as string || 'chave_secreta_padrao'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d"

// 1. Função para GERAR o token JWT no Login
export function gerarToken(payload: TokenPayload): string{
    return jwt.sign(
        payload,
        JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        } as jwt.SignOptions
    )
}

// 2. Função para VALIDAR o token nos Middlewares
export function verificarToken(token: string): TokenPayload{
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload
    } catch (error) {
        throw new Error('Token inválido ou expirado');
    }
}
