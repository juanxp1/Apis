import { Module } from '@nestjs/common';
import { AuthModule } from './auth_module/auth.module';
import { PaymentModule } from './payments/payment.module';

@Module({
  imports: [AuthModule, PaymentModule],
  providers: [],
})
export class AppModule {}
