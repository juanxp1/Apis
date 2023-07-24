import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { BuyDaviplataDto } from '../../dto/buy-daviplata.dto';
import { OtpDaviplataDto } from '../../dto/otp-daviplata.dto';
import { ConfirmDaviplataDto } from '../../dto/confirm-daviplata.dto';
import { DaviplataService } from '../../services/daviplata/daviplata.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../../entities/payment.entity';

@Controller('daviplata')
export class DaviplataController {
  constructor(
    @InjectRepository(Payment)
    private readonly daviplataService: DaviplataService,
  ) {}

  @Get('auth-daviplata')
  async auth(@Res() res): Promise<any> {
    const response = await this.daviplataService.auth();
    res.status(response.statusCode).json(response);
  }

  @Post('buy-daviplata')
  async buy(@Body() params: BuyDaviplataDto, @Res() res): Promise<any> {
    const response = await this.daviplataService.buy(params);
    res.status(response.statusCode).json(response);
  }

  @Post('otp-daviplata')
  async otp(@Body() params: OtpDaviplataDto, @Res() res): Promise<any> {
    const response = await this.daviplataService.otp(params);
    res.status(response.statusCode).json(response);
  }

  @Post('confirm-daviplata')
  async confirm(@Body() params: ConfirmDaviplataDto, @Res() res): Promise<any> {
    const response = await this.daviplataService.confirm(params);
    res.status(response.statusCode).json(response);
  }
}
