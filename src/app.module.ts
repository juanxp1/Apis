import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from '../database';
import { Access } from './access.entity';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(database),
    TypeOrmModule.forFeature([Access]),
  ],
  controllers: [AccessController],
  providers: [AccessService],
})
export class AppModule {}
