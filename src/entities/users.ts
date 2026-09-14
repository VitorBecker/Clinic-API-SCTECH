import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

<<<<<<< HEAD
export enum UserarioRole {
=======
export enum UsuarioRole {
>>>>>>> feat/rbac
    PACIENTE = "PACIENTE",
    MEDICO = "MEDICO",
    ADMIN = "ADMIN"
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  nome!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  senha!: string;

  @Column({
    type: 'enum',
<<<<<<< HEAD
    enum: UserarioRole,
    default: UserarioRole.PACIENTE,
  })
  role!: UserarioRole;
=======
    enum: UsuarioRole,
    default: UsuarioRole.PACIENTE,
  })
  role!: UsuarioRole;
>>>>>>> feat/rbac

  @CreateDateColumn({ name: 'created_at' })
  criadoEm!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  atualizadoEm!: Date;
}