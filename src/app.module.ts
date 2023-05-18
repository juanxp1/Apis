import { Module } from '@nestjs/common';
import { AuthModule } from './auth_module/auth.module';

@Module({
  imports: [AuthModule],
  providers: [],
})
export class AppModule {}
