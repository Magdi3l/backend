
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  nombre_usuario: string;

  @Column()
  cedula: string;

  @Column()
  telefono: string;
  
  @Column()
  contraseña: string;

  @Column({unique: true})
  email: string;
  
}
