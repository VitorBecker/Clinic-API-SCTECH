import { Router } from 'express';
import { UsersController } from '../controllers/UsersControllers'; 
/* import { authRoutes } from "./auth.routes"
import { pacienteRoutes } from "./paciente.routes";
import { medicoRoutes } from "./medico.routes";
import { consultaRoutes } from "./consulta.routes" */

const routes = Router();

const usersController = new UsersController();

routes.post('/auth/register', (req, res) => usersController.cadastrar(req, res));
routes.post('/auth/login', (req, res) => usersController.login(req, res));


/* routes.use("/auth", authRoutes)
routes.use("/pacientes", pacienteRoutes)
routes.use("/medicos", medicoRoutes)
routes.use("/consultas", consultaRoutes) */

export { routes };
