import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Access } from './access.entity';

@Injectable()
export class AccessService {
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
}
