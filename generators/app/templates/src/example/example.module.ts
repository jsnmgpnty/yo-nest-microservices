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
import { ConfigOptions } from '../config-options';

@Module({ })
export class ExampleModule {
  static register(config: ConfigOptions): DynamicModule {
    return {
      module: ExampleModule,
      imports: [
        MongooseModule.forFeature([{ name: Example.name, schema: ExampleSchema }]),
        CommonModule.register(),
      ],
      controllers: [ExampleController],
      providers: [ExampleService],
    };
  }
}
