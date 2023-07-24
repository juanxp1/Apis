import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { certPem } from '../../certified/cert_dummy_lab_key_v2.pem';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { certCrt } from '../../certified/cert_dummy_lab_v2.crt';

@Module({
  imports: [],
  controllers: [],
  providers: [ConfigService, certPem, certCrt],
})
export class UtilsModule {}
