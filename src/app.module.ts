import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth_module/auth.module';
import { PaymentModule } from './payments/payment.module';
import * as cors from 'cors'; 

@Module({
  imports: [AuthModule, PaymentModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors({
      origin: 'https://idrd.gov.co',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    })).forRoutes('*');
  }
}
