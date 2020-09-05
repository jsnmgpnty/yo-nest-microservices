import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
<% if (useRabbitMq) { %>
import { MessagingModule } from '../messaging/messaging.module';
<% } %>
<% if (useRedis) { %>
import { RedisModule } from '../redis/redis.module';
<% } %>
<% if (useOpenApiSources) { %>
import { OpenApiConnectorModule } from '../open-api-connector';
<% } %>
<% if (useStorage) { %>
import { StorageModule } from '../storage';
<% } %>
import { LoggingModule } from '../logging';
import { ConfigOptions } from '../config-options';
import { ExampleModule } from '../example/example.module';

@Module({})
export class AppModule {
  static register(config: ConfigOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [
        MongooseModule.forRoot(config.database.connectionString),
        LoggingModule.register({ elasticSearch: config.elasticSearch, appName: config.appName }),
        <% if(useRabbitMq) { %>
        MessagingModule.register(config.messaging),
        <% } %>
        <% if (useRedis) { %>
        RedisModule.register({ appName: config.appName, host: config.redis.host, port: config.redis.port }),
        <% } %>
        <% if (useOpenApiSources) { %>
        OpenApiConnectorModule.register(config.openApi),
        <% } %>
        <% if (useStorage) { %>
        StorageModule.register(config.storage),
        <% } %>
        ExampleModule.register(config),
      ],
    };
  }
}
