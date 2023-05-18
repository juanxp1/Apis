import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from '../data_bases/database';
import { Access } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(database),
    TypeOrmModule.forFeature([Access]),
    JwtModule.register({
      secret: process.env.MOD_SCR,
      signOptions: { expiresIn: process.env.MOD_TIM },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, ConfigService],
})
export class AuthModule {}
