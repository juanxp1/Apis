import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Oid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user: string;

  @Column()
  password: string;

  @Column()
  email: string;
}
