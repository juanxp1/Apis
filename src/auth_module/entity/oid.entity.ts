import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OidDto } from '../dto/oid.dto';

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

  static mapToDto(userDto: OidDto): Oid {
    const user = new Oid();
    user.user = userDto.user;
    user.password = userDto.password;
    user.email = userDto.email;
    return user;
  }
}
