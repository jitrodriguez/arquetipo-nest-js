import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../config/database.config';
import { ClientController } from '../controller/client.controller';
import { Client } from '../domain/entity/client.entity';
import { ClientServiceImpl } from '../service/impl/client.service.impl';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    TypeOrmModule.forFeature([Client]),
  ],
  providers: [ClientServiceImpl],
  controllers: [ClientController],
})
export class ClientModule {}
