import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/filters/error.filter';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });

  const configService = app.get(ConfigService);
  const appService = app.get(AppService);
  const apiVersion = configService.get('app.apiPrefix')
  const PORT = configService.get('app.port')
  const logger = appService.logMessage
  
  app.setGlobalPrefix(apiVersion, { exclude: ['', 'health', 'docs'] });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT);
  logger('Connected')
  logger(`Application server listening on port ${configService.get('app.port')}`);
}

bootstrap();