import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriberService {
  @RabbitSubscribe({
    exchange: 'example.exchange',
    routingKey: '',
    queue: 'example-subscribe-queue',
  })
  public async handleExampleSubscribe(msg: any) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
  }
}