import { Module, DynamicModule } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { SubscriberService } from './subscriber.service';
import { PublisherService } from './publisher.service';
import { MessagingOptions } from './messaging-options';
import { LoggingModule, LoggerOptions } from '../logging';

@Module({ })
export class MessagingModule {
  static register (options: MessagingOptions, logOptions?: LoggerOptions) : DynamicModule {
    return {
      module: MessagingModule,
      imports: [
        RabbitMQModule.forRoot(RabbitMQModule, options),
        LoggingModule.register(logOptions)
      ],
      providers: [SubscriberService, PublisherService],
      exports: [SubscriberService, PublisherService],
    };
  }
}
