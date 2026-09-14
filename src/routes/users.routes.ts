import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { UsuarioRole } from '../entities/users';
import { UsersController } from '../controllers/UsersControllers';

const usersRoutes = Router();

const usersController = new UsersController();


// GET /users/me (Dados completos do usuario autenticado)
usersRoutes.get('/me', authMiddleware, (req, res, next) =>
  usersController.meuPerfil(req, res, next)
);

// GET /users/admin (Restrito ao perfil ADMIN)
usersRoutes.get('/admin', authMiddleware, roleMiddleware(UsuarioRole.ADMIN), (req, res, next) =>
  usersController.acessoAdministrativo(req, res, next)
);

export { usersRoutes };