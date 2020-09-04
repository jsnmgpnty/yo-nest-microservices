import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { isNil } from 'lodash';
import { LoggerService } from '../logging';

@Injectable()
export class PublisherService {
  constructor(private readonly amqpConnection: AmqpConnection, private logger: LoggerService) {}

  async publish<T>(exchange: string, routingKey: string, message: T) {
    return new Promise(resolve => {
      this.logger.log(`AMQP published to ${exchange} - ${routingKey} | ${JSON.stringify(message)}`);
      if (isNil(routingKey)) routingKey = '';
      resolve(this.amqpConnection.publish(exchange, routingKey, message));
    });
  }
}
