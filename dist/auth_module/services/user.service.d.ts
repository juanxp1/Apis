import { Repository } from 'typeorm';
import { Oid } from '../entity/oid.entity';
export declare class UserService {
    private readonly accessRepository;
    constructor(accessRepository: Repository<Oid>);
    findAll(): Promise<Oid[]>;
    findOneById(id: number): Promise<Oid>;
    findByUsername(user: string): Promise<Oid | undefined>;
    create(user: Oid): Promise<Oid>;
}
