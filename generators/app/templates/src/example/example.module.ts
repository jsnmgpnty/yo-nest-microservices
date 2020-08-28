import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
<% if (useRabbitMq) { %>
import { MessagingModule } from '../messaging/messaging.module';
<% } %>
import { ExampleController } from './controller/example.controller';
import { ExampleSchema } from './schema/example.schema';
import { Example } from './models/example.entity';
import { ExampleService } from './services/example.service';
import { CommonModule } from '../common/common.module';
import { LoggingModule } from '../logging/logging.module';
<% if (useRedis) { %>
import { RedisModule } from '../redis/redis.module';
<% } %>
import { ConfigOptions } from '../config-options';
<% if (useOpenApiSources) { %>
import { OpenApiConnectorModule } from '../open-api-connector';
<% } %>

@Module({ })
export class ExampleModule {
  static register(config: ConfigOptions): DynamicModule {
    return {
      module: ExampleModule,
      imports: [
        MongooseModule.forFeature([{ name: Example.name, schema: ExampleSchema }]),
        LoggingModule.register({ elasticSearch: config.elasticSearch, appName: config.appName }),
        <% if (useRabbitMq) { %>
        MessagingModule.register(
          config.messaging,
          { elasticSearch: config.elasticSearch, appName: `amqp-${config.appName}` },
        ),
        <% } %>
        <% if (useRedis) { %>
        RedisModule.register(
          { appName: config.appName, host: config.redis.host, port: config.redis.port }, 
          { elasticSearch: config.elasticSearch, appName: `redis-${config.appName}` },
        ),
        <% } %>
        <% if (useOpenApiSources) { %>
        OpenApiConnectorModule.register(
          config.openApi,
          { elasticSearch: config.elasticSearch, appName: `open-api-${config.appName}` },
        ),
        <% } %>
        CommonModule.register(config),
      ],
      controllers: [ExampleController],
      providers: [ExampleService],
    };
  }
}
