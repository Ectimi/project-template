import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getConfig from './config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const config: any = await getConfig();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const documentBuilder = new DocumentBuilder()
    .setTitle('IQB API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: '基于 jwt 的认证',
      name: 'bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('doc', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static',
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(config.application.port);
}

bootstrap();
