import { Injectable } from '@nestjs/common';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../../entities/payment.entity';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { TokenEntity } from '../../entities/tokendav.entity';
import {TokenRequestDto} from "../../dto/token-request.dto";
@Injectable()
export class DaviplataService {
  private readonly certPath: string;
  private readonly keyPath: string;
  private readonly agent: https.Agent;
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private configService: ConfigService,
  ) {
    const certsDir = path.join(__dirname, '../../../utils/certified/');
    console.log('jacgsaw', __dirname);
    this.certPath = path.join(certsDir, 'cert_dummy_lab_v2.crt');
    this.keyPath = path.join(certsDir, 'cert_dummy_lab_key_v2.pem');
    console.log('jacgsaw-cert', this.certPath);
    console.log('jacgsaw-key', this.keyPath);
    console.log('jacgsaw-dir', certsDir);

    this.agent = new https.Agent({
      cert: fs.readFileSync(this.certPath),
      key: fs.readFileSync(this.keyPath),
    });
  }

  async getTokenV2(tokenRequestDto: TokenRequestDto): Promise<any> {
    const data =
      'grant_type=client_credentials&client_id=UK67GogoRliAuUm9HNAURzzHn3K2EHxemYKTPtFHgtkESrC2&client_secret=wcYPCx1DpdjA9ybAQHkRkVqv3Iq8QuOLSoLZGaMYcX0kwgH68RJfvwIdj9TqzuNu&scope=daviplata';

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://apislab.daviplata.com/oauth2Provider/type1/v1/token',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie:
          'incap_ses_1599_2684467=OGQ0DwgG71Wai9cqKsowFnzjvmQAAAAA2YeaI+KVIYOGAQ2c6iU88A==; nlbi_2684467=JHA3LdbGhBQXqZihJj8ifgAAAAASgSKYELLjjg+BY/ezuIRl; visid_incap_2684467=M7b9/r89QxyLFmDitFna9GpmUWQAAAAAQUIPAAAAAACNVeZqF3B4A5dMS6b3T5jl',
      },
      data: data,
      httpsAgent: this.agent,
    };

    try {
      const response = await axios.request<TokenEntity>(config);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
