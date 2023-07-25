import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { DaviplataService } from '../../services/daviplata/daviplata.service';
import { TokenRequestDto } from '../../dto/token-request.dto';
import { TokenEntity } from '../../entities/tokendav.entity';

@Controller('daviplata')
export class DaviplataController {
  constructor(private readonly daviplataService: DaviplataService) {}
  @Post('getTokenV2')
  async getTokenV2(@Body() token: TokenRequestDto): Promise<TokenEntity> {
    console.log('jacgsaw-dto', token.client_id);
    return this.daviplataService.getTokenV2(token);
  }
}
