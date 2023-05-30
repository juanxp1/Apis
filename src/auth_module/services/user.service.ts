import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Oid } from '../entity/oid.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Oid)
    private readonly accessRepository: Repository<Oid>,
  ) {}

  async findAll(): Promise<Oid[]> {
    return this.accessRepository.find();
  }

  async findOneById(id: number): Promise<Oid> {
    const getUser: FindOneOptions<Oid> = { where: { id } };
    return this.accessRepository.findOne(getUser);
  }

  async findByUsername(user: string): Promise<Oid | undefined> {
    const getUserForName: FindOneOptions<Oid> = { where: { user: user } };
    return this.accessRepository.findOne(getUserForName);
  }

  async create(user: Oid): Promise<Oid> {
    return this.accessRepository.save(user);
  }
}
