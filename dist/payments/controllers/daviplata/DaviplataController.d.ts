import { DaviplataService } from '../../services/daviplata/daviplata.service';
import { TokenRequestDto } from '../../dto/token-request.dto';
import { TokenEntity } from '../../entities/tokendav.entity';
export declare class DaviplataController {
    private readonly daviplataService;
    constructor(daviplataService: DaviplataService);
    getTokenV2(token: TokenRequestDto): Promise<TokenEntity>;
}
