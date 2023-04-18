import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from './access.entity';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sip.jacgsaw.com',
      port: 3306,
      username: 'andrewx',
      password: 'P40l1t47',
      database: 'idrdgov_simgeneral',
      entities: [Access],
      synchronize: false,
      //charset: 'utf8mb4', // establece el juego de caracteres en utf8mb4
    }),
    TypeOrmModule.forFeature([Access]),
  ],
  controllers: [AccessController],
  providers: [AccessService],
})
export class AppModule {}
