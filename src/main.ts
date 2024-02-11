import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/filters/error.filter';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './common/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });

  const configService = app.get(ConfigService);
  const appService = app.get(AppService);

  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    // exclude: ['/']
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    // forbidNonWhitelisted: true,
    transform: true
  }))
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(configService.get('app.port'));
  appService.logMessage('Connected')
  console.info(
    `Application server listening on port ${configService.get('app.port')}`
  );
}

bootstrap();