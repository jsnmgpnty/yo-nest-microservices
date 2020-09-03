import { Module, DynamicModule, Global } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { SubscriberService } from './subscriber.service';
import { PublisherService } from './publisher.service';
import { MessagingOptions } from './messaging-options';

@Global()
@Module({ })
export class MessagingModule {
  static register (options: MessagingOptions) : DynamicModule {
    return {
      module: MessagingModule,
      imports: [RabbitMQModule.forRoot(RabbitMQModule, options)],
      providers: [SubscriberService, PublisherService],
      exports: [SubscriberService, PublisherService],
    };
  }
}
