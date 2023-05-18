import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idusuario: number;

  @Column()
  usuario: string;

  @Column()
  contrasena: string;
}
