import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { DaviplataService } from '../../services/daviplata/daviplata.service';
import { TokenRequestDto } from '../../dto/token-request.dto';

@Controller('daviplata')
export class DaviplataController {
  constructor(private readonly daviplataService: DaviplataService) {}
  @Post('getTokenV2')
  async getTokenV2(@Body() tokenRequestDto: TokenRequestDto): Promise<any> {
    return this.daviplataService.getTokenV2(tokenRequestDto);
  }
}
