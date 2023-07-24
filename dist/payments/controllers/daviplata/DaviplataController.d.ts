import { DaviplataService } from '../../services/daviplata/daviplata.service';
import { TokenRequestDto } from '../../dto/token-request.dto';
export declare class DaviplataController {
    private readonly daviplataService;
    constructor(daviplataService: DaviplataService);
    getTokenV2(tokenRequestDto: TokenRequestDto): Promise<any>;
}
