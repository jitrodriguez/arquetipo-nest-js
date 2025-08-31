import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigurationKeys } from './common/util/enums/config.keys';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from './common/util/logger/logger';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get(ConfigurationKeys.PORT);
  const baseUrl = configService.get(ConfigurationKeys.BASE_URL);
  const logLevels = configService.get(ConfigurationKeys.LOG_LEVELS);

  app.setGlobalPrefix(baseUrl);
  app.useGlobalPipes(new ValidationPipe());
  const configSwagger = new DocumentBuilder()
    .setTitle('Arquetipo Node Js')
    .setDescription(
      'API básica para creación, eliminación y actualización de clientes'
    )
    .setVersion('1.0')
    .setContact('Juan Rodriguez', 'https://juanrodriguez.netlify.app/', '')
    .setExternalDoc('Postman Collection', '/docs-json')
    .addServer(`http://localhost:${port}`)
    .addTag('clientes')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, document);
  await app.listen(port);
  const logger = new Logger(logLevels);
  logger.log(`Server running on port ${port}`);
  app.useLogger(logger);
  app.use(csurf());
}
bootstrap();
