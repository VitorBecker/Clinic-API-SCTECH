import { AppDataSource } from '../data-source';
import { Usuario } from '../entities/users';

// Obtém o repositório padrão do TypeORM para a entidade Ususario
export const userRepository = AppDataSource.getRepository(Usuario);

