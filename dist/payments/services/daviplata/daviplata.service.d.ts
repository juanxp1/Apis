import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { ConfigService } from '@nestjs/config';
import { TokenEntity } from '../../entities/tokendav.entity';
import { TokenRequestDto } from '../../dto/token-request.dto';
export declare class DaviplataService {
    private readonly paymentRepository;
    private configService;
    private readonly certPath;
    private readonly keyPath;
    private readonly agent;
    private readonly apiUrl;
    private readonly requestHeaders;
    constructor(paymentRepository: Repository<Payment>, configService: ConfigService);
    getTokenV2(tokenRequestDto: TokenRequestDto): Promise<TokenEntity>;
}
