import { Module } from '@nestjs/common';
import { DaviplataController } from './controllers/daviplata/DaviplataController';
import { DaviplataService } from './services/daviplata/daviplata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [DaviplataController],
  providers: [DaviplataService, ConfigService],
})
export class PaymentModule {}
