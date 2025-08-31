import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controller/app.controller';
import { AppServiceImpl } from './service/impl/app.service.impl';
import { config } from './config/config';
import { MainModule } from './module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env.local' : `.env.${ENV}`,
      load: [config],
    }),
    MainModule,
  ],
  controllers: [AppController],
  providers: [AppServiceImpl],
})
export class AppModule {}
