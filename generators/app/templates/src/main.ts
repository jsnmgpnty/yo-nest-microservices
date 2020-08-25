import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import setupStaticPage from './utils/setup-static';
import config from './config';
import { resolve } from 'path';

async function bootstrap() {
  // fastify app setup
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.setGlobalPrefix('api');

  // open api setup
  const { title, description, version } = config.swagger;
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('explorer', app, document);

  // index.html setup
  setupStaticPage(app, resolve(__dirname, 'public', 'index.html'));

  await app.listen(config.appPort);
};

bootstrap();
