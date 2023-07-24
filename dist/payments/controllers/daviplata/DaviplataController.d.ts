import { BuyDaviplataDto } from '../../dto/buy-daviplata.dto';
import { OtpDaviplataDto } from '../../dto/otp-daviplata.dto';
import { ConfirmDaviplataDto } from '../../dto/confirm-daviplata.dto';
import { DaviplataService } from '../../services/daviplata/daviplata.service';
export declare class DaviplataController {
    private readonly daviplataService;
    constructor(daviplataService: DaviplataService);
    auth(res: any): Promise<any>;
    buy(params: BuyDaviplataDto, res: any): Promise<any>;
    otp(params: OtpDaviplataDto, res: any): Promise<any>;
    confirm(params: ConfirmDaviplataDto, res: any): Promise<any>;
}
