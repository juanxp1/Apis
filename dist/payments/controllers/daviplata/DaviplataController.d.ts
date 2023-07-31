import { DaviplataService } from '../../services/daviplata/daviplata.service';
import { TokenRequestDto } from '../../dto/token-request.dto';
import { TokenEntity } from '../../entities/tokendav.entity';
import { BuyDaviplataDto } from 'src/payments/dto/buy-daviplata.dto';
import { BuyEntity } from 'src/payments/entities/buydav.entity';
import { OtpEntity } from 'src/payments/entities/optdav.entity';
import { OtpDaviplataDto } from 'src/payments/dto/otp-daviplata.dto';
import { ConfirmBuyEntity } from 'src/payments/entities/confirmardav.entity';
import { ConfirmDaviplataDto } from 'src/payments/dto/confirm-daviplata.dto';
export declare class DaviplataController {
    private readonly daviplataService;
    constructor(daviplataService: DaviplataService);
    getTokenV2(token: TokenRequestDto): Promise<TokenEntity>;
    realizarCompraV1(compraData: BuyDaviplataDto): Promise<BuyEntity>;
    readOtp(readOtpData: OtpDaviplataDto): Promise<OtpEntity>;
    confirmarCompraV1(confirmarCompraData: ConfirmDaviplataDto): Promise<ConfirmBuyEntity>;
}
