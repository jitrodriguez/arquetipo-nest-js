import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { ClientModule } from './client.module';

@Module({ imports: [ClientModule], controllers: [], providers: [] })
export class MainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
