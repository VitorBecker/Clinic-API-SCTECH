import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
/* import { Usuario } from './entities/Usuario';
import { Paciente } from './entities/Paciente';
import { Medico } from './entities/Medico';
import { Consulta } from './entities/Consulta'; */

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST || 'localhost',
  port: Number(process.env.PG_PORT) || 5432,
  username: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || '',
  database: process.env.PG_DATABASE || 'medclinic_db',
  synchronize: true, // Mantenha true no início para sincronizar a entidade automaticamente ou false ao usar migrations
  migrations: [__dirname + '/database/migrations/*.{ts,js}'],
  logging: false,
  entities: [__dirname + '/entities/*.{ts,js}'],
  subscribers: [],
});