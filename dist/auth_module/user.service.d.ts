import { Repository } from 'typeorm';
import { Access } from './auth.entity';
export declare class UserService {
    private readonly accessRepository;
    constructor(accessRepository: Repository<Access>);
    findAll(): Promise<Access[]>;
    findOneById(id: number): Promise<Access>;
    findByUsername(usuario: string): Promise<Access | undefined>;
    create(user: Access): Promise<Access>;
}
