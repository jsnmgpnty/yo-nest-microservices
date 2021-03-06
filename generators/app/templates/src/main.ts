import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'fastify-helmet';
import { AppModule } from './app/app.module';
import setupStaticPage from './utils/setup-static';
import { resolve } from 'path';
import configuration from './configuration';
import { ConfigOptions } from './config-options';
import { LoggerService } from './logging';

async function bootstrap() {
  const config = configuration() as ConfigOptions;

  // fastify app setup
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule.register(config),
    new FastifyAdapter(),
    { logger: false },
  );
  app.register(helmet);
  app.useLogger(app.get(LoggerService));
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
