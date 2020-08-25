import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagingModule } from '../messaging/messaging.module';
import { ExampleController } from './controller/example.controller';
import { ExampleSchema, Example } from './schema/example.entity';
import { ExampleService } from './services/example.service';
import { CommonModule } from '../common/common.module';
import { LoggingModule } from '../logging/logging.module';
import { RedisModule } from '../redis/redis.module';
import config from '../config';
import { OpenApiService, OpenApiConnectorModule } from 'src/open-api-connector';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Example.name, schema: ExampleSchema }]),
    LoggingModule.register({ elasticSearch: config.elasticSearch, appName: config.appName }),
    MessagingModule.register(
      config.messaging,
      { elasticSearch: config.elasticSearch, appName: `amqp-${config.appName}` },
    ),
    RedisModule.register(
      { appName: config.appName, host: config.redis.host, port: config.redis.port }, 
      { elasticSearch: config.elasticSearch, appName: `redis-${config.appName}` },
    ),
    OpenApiConnectorModule.register(
      config.openApi,
      { elasticSearch: config.elasticSearch, appName: `open-api-${config.appName}` },
    ),
    CommonModule,
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
