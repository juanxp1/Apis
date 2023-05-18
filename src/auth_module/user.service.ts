import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Users } from './auth.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly accessRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.accessRepository.find();
  }

  async findOneById(id: number): Promise<Users> {
    const getUser: FindOneOptions<Users> = { where: { id } };
    return this.accessRepository.findOne(getUser);
  }

  async findByUsername(usuario: string): Promise<Users | undefined> {
    const getUserForName: FindOneOptions<Users> = { where: { usuario } };
    return this.accessRepository.findOne(getUserForName);
  }

  async create(user: Users): Promise<Users> {
    return this.accessRepository.save(user);
  }
}
