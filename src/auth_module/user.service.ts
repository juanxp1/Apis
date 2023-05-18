import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Access } from './auth.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Access)
    private readonly accessRepository: Repository<Access>,
  ) {}

  async findAll(): Promise<Access[]> {
    return this.accessRepository.find();
  }

  async findOneById(id: number): Promise<Access> {
    const getUser: FindOneOptions<Access> = { where: { id } };
    return this.accessRepository.findOne(getUser);
  }

  async findByUsername(usuario: string): Promise<Access | undefined> {
    const getUserForName: FindOneOptions<Access> = { where: { usuario } };
    return this.accessRepository.findOne(getUserForName);
  }

  async create(user: Access): Promise<Access> {
    return this.accessRepository.save(user);
  }
}
