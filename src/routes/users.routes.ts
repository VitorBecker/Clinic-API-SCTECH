import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { UsuarioRole } from '../entities/users';

const usersRoutes = Router();

// GET /users/me (Dados do usuario autenticado)
usersRoutes.get('/me', authMiddleware, (req, res) => {
  return res.status(200).json({
    mensagem: 'Autenticação bem-sucedida',
    usuarioLogado: req.usuario,
  });
});

// GET /users/admin (Restrito ao perfil ADMIN)
usersRoutes.get('/admin', authMiddleware, roleMiddleware(UsuarioRole.ADMIN), (req, res) => {
    return res.status(200).json({
      mensagem: 'Acesso ao painel administrativo concedido',
      usuarioLogado: req.usuario,
    });
  }
);

export { usersRoutes };