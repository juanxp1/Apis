import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { ConfigService } from '@nestjs/config';
export declare class DaviplataService {
    private readonly paymentRepository;
    private configService;
    private readonly certPath;
    private readonly keyPath;
    private readonly agent;
    constructor(paymentRepository: Repository<Payment>, configService: ConfigService);
    getTokenV2(): Promise<any>;
}
