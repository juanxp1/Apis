import { Repository } from 'typeorm';
import { BuyDaviplataDto } from '../../dto/buy-daviplata.dto';
import { OtpDaviplataDto } from '../../dto/otp-daviplata.dto';
import { ConfirmDaviplataDto } from '../../dto/confirm-daviplata.dto';
import { Payment } from '../../entities/payment.entity';
import { ConfigService } from '@nestjs/config';
export declare class DaviplataService {
    private readonly paymentRepository;
    private configService;
    private readonly certPath;
    private readonly keyPath;
    private readonly agent;
    constructor(paymentRepository: Repository<Payment>, configService: ConfigService);
    auth(): Promise<{
        statusCode: any;
        status: string;
        message: string;
        data: string;
        Error: boolean;
    }>;
    buy(params: BuyDaviplataDto): Promise<{
        statusCode: any;
        status: string;
        message: string;
        data: string;
        Error: boolean;
    }>;
    otp(params: OtpDaviplataDto): Promise<{
        statusCode: any;
        status: string;
        message: string;
        data: string;
        Error: boolean;
    }>;
    confirm(params: ConfirmDaviplataDto): Promise<{
        statusCode: any;
        status: string;
        message: string;
        data: string;
        Error: boolean;
    }>;
    response(statusCode?: any, status?: string, message?: string, data?: string, Error?: boolean): {
        statusCode: any;
        status: string;
        message: string;
        data: string;
        Error: boolean;
    };
    getTypePerson(type_person: string): "NATURAL" | "JURIDICA";
    getTypeDocument(type: string): 7 | 1 | 2 | 4 | 6 | 3 | 14;
}
