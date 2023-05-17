import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from '../database';
import { Access } from './access.entity';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(database),
    TypeOrmModule.forFeature([Access]),
    JwtModule.register({
      secret: 'jacgsawx',
      signOptions: { expiresIn: process.env.MOD_TIM },
    }),
  ],
  controllers: [AccessController],
  providers: [AccessService, AuthService, ConfigService],
})
export class AppModule {}
