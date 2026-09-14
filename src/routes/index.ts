import { Router } from 'express';
<<<<<<< HEAD
import { UsersController } from '../controllers/UsersControllers'; 
=======
import { UsersController } from '../controllers/UsersControllers';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware'; 
import { UsuarioRole } from '../entities/users'; 
>>>>>>> feat/rbac
/* import { authRoutes } from "./auth.routes"
import { pacienteRoutes } from "./paciente.routes";
import { medicoRoutes } from "./medico.routes";
import { consultaRoutes } from "./consulta.routes" */

const routes = Router();

const usersController = new UsersController();

<<<<<<< HEAD
=======
// Rotas públicas (Auth)
>>>>>>> feat/rbac
routes.post('/auth/register', (req, res) => usersController.cadastrar(req, res));
routes.post('/auth/login', (req, res) => usersController.login(req, res));


/* routes.use("/auth", authRoutes)
routes.use("/pacientes", pacienteRoutes)
routes.use("/medicos", medicoRoutes)
routes.use("/consultas", consultaRoutes) */

<<<<<<< HEAD
=======

// Rota de verificação para QUALQUER usuário autenticado
routes.get('/perfil', authMiddleware, (req, res) => {
  return res.status(200).json({
    mensagem: 'Autenticação bem-sucedida',
    usuarioLogado: req.usuario,
  });
});

// Rota de verificação restrito apenas para ADMIN
routes.get(
  '/admin/painel',
  authMiddleware,
  roleMiddleware(UsuarioRole.ADMIN),
  (req, res) => {
    return res.status(200).json({
      mensagem: 'Acesso concedido ao painel administrativo',
      usuarioLogado: req.usuario,
    });
  }
);

// Rota de verificação restrito apenas para MEDICO ou ADMIN
routes.get(
  '/medico/agenda',
  authMiddleware,
  roleMiddleware(UsuarioRole.ADMIN, UsuarioRole.MEDICO),
  (req, res) => {
    return res.status(200).json({
      mensagem: 'Acesso concedido à agenda médica',
      usuarioLogado: req.usuario,
    });
  }
);

>>>>>>> feat/rbac
export { routes };
