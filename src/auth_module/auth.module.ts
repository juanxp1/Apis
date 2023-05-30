import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from '../data_bases/database';
import { Oid } from './entity/oid.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(database),
    TypeOrmModule.forFeature([Oid]),
    JwtModule.register({
      secret: process.env.MOD_SCR,
      signOptions: { expiresIn: process.env.MOD_TIM },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, ConfigService],
})
export class AuthModule {}
