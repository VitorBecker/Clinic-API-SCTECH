import { Router } from 'express';
import { UsersController } from '../controllers/UsersControllers';

const authRoutes = Router();
const usersController = new UsersController();

authRoutes.post('/register', (req, res, next) => usersController.cadastrar(req, res, next));
authRoutes.post('/login', (req, res, next) => usersController.login(req, res, next));

export { authRoutes };