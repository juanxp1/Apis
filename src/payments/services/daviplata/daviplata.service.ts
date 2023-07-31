import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig } from 'axios';
import { TokenEntity } from '../../entities/tokendav.entity';
import { TokenRequestDto } from '../../dto/token-request.dto';
import { BuyEntity } from 'src/payments/entities/buydav.entity';
import { BuyDaviplataDto } from 'src/payments/dto/buy-daviplata.dto';
import { OtpEntity } from 'src/payments/entities/optdav.entity';
import { OtpDaviplataDto } from 'src/payments/dto/otp-daviplata.dto';
import { ConfirmDaviplataDto } from 'src/payments/dto/confirm-daviplata.dto';
import { ConfirmBuyEntity } from 'src/payments/entities/confirmardav.entity';


@Injectable()
export class DaviplataService {
  private readonly certPath: string;
  private readonly keyPath: string;
  private readonly agent: https.Agent;
  private readonly apiUrl: string;
  private readonly apiUrlCompra: string;
  private readonly apiUrlOpt: string;
  private readonly apiUrlConfirm: string;
  private readonly requestHeaders: { Accept: string; 'Content-Type': string };
  private otp: string;
  private idSessionToken: string;
  private accessToken: string = '';
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private configService: ConfigService,
  ) {
    const certsDir = path.join(__dirname, '../../../utils/certified/');
    this.certPath = path.join(certsDir, 'cert_dummy_lab_v2.crt');
    this.keyPath = path.join(certsDir, 'cert_dummy_lab_key_v2.pem');

    this.agent = new https.Agent({
      cert: fs.readFileSync(this.certPath),
      key: fs.readFileSync(this.keyPath),
    });

    this.apiUrl = 'https://apislab.daviplata.com/oauth2Provider/type1/v1/token';
    this.apiUrlCompra = 'https://apislab.daviplata.com/daviplata/v1/compra';
    this.apiUrlOpt = 'https://apislab.daviplata.com/otpSec/v1/read',
      this.apiUrlConfirm = 'https://apislab.daviplata.com/daviplata/v1/confirmarCompra'

    this.requestHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      //TODO validar si se requiere en produccion la variable Cookie
      //Cookie: 'incap_ses_1599_2684467=OGQ0DwgG71Wai9cqKsowFnzjvmQAAAAA2YeaI+KVIYOGAQ2c6iU88A==; nlbi_2684467=JHA3LdbGhBQXqZihJj8ifgAAAAASgSKYELLjjg+BY/ezuIRl; visid_incap_2684467=M7b9/r89QxyLFmDitFna9GpmUWQAAAAAQUIPAAAAAACNVeZqF3B4A5dMS6b3T5jl',
    };
  }


  async getTokenV2(tokenRequestDto: TokenRequestDto): Promise<TokenEntity> {
    const data = `grant_type=${tokenRequestDto.grant_type}&client_id=${tokenRequestDto.client_id}&client_secret=${tokenRequestDto.client_secret}&scope=${tokenRequestDto.scope}`;
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: this.apiUrl,
      headers: this.requestHeaders,
      data: data,
      httpsAgent: this.agent,
    };
    try {
      const response = await axios.request<TokenEntity>(config);
      this.accessToken = response.data.access_token;
      console.log('token', this.accessToken)
      return response.data;

    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async realizarCompraV1(compraData: BuyDaviplataDto): Promise<BuyEntity> {
    const config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: this.apiUrlCompra,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
        'x-ibm-client-id': 'UK67GogoRliAuUm9HNAURzzHn3K2EHxemYKTPtFHgtkESrC2',
        'Content-Type': 'application/json',
      },
      data: {
        valor: compraData.valor,
        numeroIdentificacion: compraData.numeroIdentificacion,
        tipoDocumento: compraData.tipoDocumento,
      },
      httpsAgent: this.agent,
    };
    try {
      const response = await axios.request<BuyEntity>(config);
      this.idSessionToken = response.data.idSessionToken;
      return response.data;
    } catch (error) {
      console.log('Error al realizar la compra:', error.message);
      throw new HttpException('Error al realizar la compra', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async readOtp(readOtpData: OtpDaviplataDto): Promise<OtpEntity> {
    const config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: this.apiUrlOpt,
      headers: {
        Accept: 'application/json',
        'x-ibm-client-id': 'UK67GogoRliAuUm9HNAURzzHn3K2EHxemYKTPtFHgtkESrC2',
        'Content-Type': 'application/json',
      },
      data: readOtpData,
      httpsAgent: this.agent,
    };
    try {
      const response = await axios.request<OtpEntity>(config);
      this.otp = response.data.otp
      return response.data;
    } catch (error) {
      console.log('Error al leer OTP:', error);
      throw new Error('Error al leer OTP');
    }
  }

  async confirmarCompraV1(confirmarCompraData: ConfirmDaviplataDto): Promise<ConfirmBuyEntity> {
    const config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: this.apiUrlConfirm,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
        'x-ibm-client-id': 'UK67GogoRliAuUm9HNAURzzHn3K2EHxemYKTPtFHgtkESrC2',
        'Content-Type': 'application/json',
        'otp': this.otp,
        'idSessionToken': this.idSessionToken,
      },
      data: confirmarCompraData,
      httpsAgent: this.agent,
      timeout: 60000,
    };
    try {
      const response = await axios.request<ConfirmBuyEntity>(config);
      console.log(response, 'HOLAAA')
      return response.data;
    } catch (error) {
      console.log('Error al confirmar la compra:', error);
      throw new Error('Error al confirmar la compra');
    }
  }
}
