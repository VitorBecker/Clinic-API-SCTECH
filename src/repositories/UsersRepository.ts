import { AppDataSource } from '../data-source';
import { Usuario } from '../entities/users';

// Repository: única camada que conhece a API do TypeORM. O Service chama
// estes métodos nomeados em vez de usar .findOneBy/.create/.save
// diretamente, mantendo a fronteira Service/Repository
const ormRepository = AppDataSource.getRepository(Usuario);


 
export const userRepository = {
  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return ormRepository.findOneBy({ email });
  },

  async buscarPorId(id: string): Promise<Usuario | null> {
    return ormRepository.findOneBy({ id });
  },

  async criar(dados: Partial<Usuario>): Promise<Usuario> {
    const usuario = ormRepository.create(dados);
    return ormRepository.save(usuario);
  },
};