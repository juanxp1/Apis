import { Repository } from 'typeorm';
import { Access } from './access.entity';
export declare class AccessService {
    private readonly accessRepository;
    constructor(accessRepository: Repository<Access>);
    findAll(): Promise<Access[]>;
    findUserById(id: number): Promise<Access>;
}
