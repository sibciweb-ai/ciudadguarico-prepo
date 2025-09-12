import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './User';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string;

  // Relación muchos a muchos con usuarios (opcional, para queries inversas)
  // @ManyToMany(() => User, user => user.roles)
  // usuarios!: User[];
} 