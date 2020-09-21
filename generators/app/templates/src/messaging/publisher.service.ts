import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { isNil } from 'lodash';
import { LoggerService } from '../logging';
@Injectable()
export class PublisherService {
  constructor(private readonly amqpConnection: AmqpConnection, private logger: LoggerService) { }

  async publish<T>(exchange: string, routingKey: string, message: T) {
    return new Promise(resolve => {
      try {
        this.logger.log(`AMQP published to ${exchange} - ${routingKey} | ${JSON.stringify(message)}`);
        if (isNil(routingKey)) routingKey = '';
        resolve(this.amqpConnection.publish(exchange, routingKey, message));
      } catch (error) {
        this.logger.error(`Failed to publish | ${JSON.stringify(message)}`, error);
        resolve(false);
      }
    });
  }

  async sendToQueue<T>(queue: string, message: T) {
    return new Promise(resolve => {
      try {
        this.logger.log(`AMQP published to queue: ${queue} | ${JSON.stringify(message)}`);
        resolve(this.amqpConnection.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true }));
      } catch (error) {
        this.logger.error(`Failed to send to queue | ${JSON.stringify(message)}`, error);
        resolve(false);
      }
    });
  }
}
