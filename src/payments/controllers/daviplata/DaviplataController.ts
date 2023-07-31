import { Body, Controller, Get, Post, Res, HttpException, HttpStatus } from '@nestjs/common';
import { DaviplataService } from '../../services/daviplata/daviplata.service';
import { TokenRequestDto } from '../../dto/token-request.dto';
import { TokenEntity } from '../../entities/tokendav.entity';
import { BuyDaviplataDto } from 'src/payments/dto/buy-daviplata.dto';
import { BuyEntity } from 'src/payments/entities/buydav.entity';
import { OtpEntity } from 'src/payments/entities/optdav.entity';
import { OtpDaviplataDto } from 'src/payments/dto/otp-daviplata.dto';
import { ConfirmBuyEntity } from 'src/payments/entities/confirmardav.entity';
import { ConfirmDaviplataDto } from 'src/payments/dto/confirm-daviplata.dto';

@Controller('daviplata')
export class DaviplataController {
  constructor(private readonly daviplataService: DaviplataService) { }


  @Post('getTokenV2')
  async getTokenV2(@Body() token: TokenRequestDto): Promise<TokenEntity> {
    console.log('jacgsaw-dto', token.client_id);
    return this.daviplataService.getTokenV2(token);
  }

  @Post('realizarCompraV1')
  async realizarCompraV1(@Body() compraData: BuyDaviplataDto): Promise<BuyEntity> {
    try {
      const respuestaCompra = await this.daviplataService.realizarCompraV1(compraData);
      console.log('COMPRA:', respuestaCompra);
      return respuestaCompra;
    } catch (error) {
      console.log('Error al realizar la compra:', error);
      throw new HttpException('Error al realizar la compra', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post('readOtp')
  async readOtp(@Body() readOtpData: OtpDaviplataDto): Promise<OtpEntity> {
    try {
      const response = await this.daviplataService.readOtp(readOtpData);
      console.log('OTP :', response);
      return response;
    } catch (error) {
      console.log('Error al leer OTP:', error);
      throw new HttpException('Error al leer OTP', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post('confirmarCompraV1')
  async confirmarCompraV1(@Body() confirmarCompraData: ConfirmDaviplataDto): Promise<ConfirmBuyEntity> {
    try {
      const confirmacionCompra = await this.daviplataService.confirmarCompraV1(confirmarCompraData);
      console.log('Confirmación de compra exitosa:', confirmacionCompra);
      return confirmacionCompra;
    } catch (error) {
      console.log('Error al confirmar la compra:', error);
      throw new HttpException('Error al confirmar la compra', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}


