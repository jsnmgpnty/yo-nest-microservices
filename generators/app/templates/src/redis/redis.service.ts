import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { RedisClient } from 'redis';
import { LoggerService } from '../logging';
import { RedisOptions } from './redis-options';
import { RedisSubscription } from './subscription.entity';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  publisherClient: RedisClient;
  subscriberClient: RedisClient;
  private subscriptions: RedisSubscription[] = [];
  static redisOptions: RedisOptions;

  constructor (private logger: LoggerService) { }

  async onModuleInit() {
    const { port, host } = RedisService.redisOptions;
    this.publisherClient = new RedisClient({ host, port });
    this.subscriberClient = new RedisClient({ host, port });
  }

  async onModuleDestroy() {
    this.subscriptions.forEach(s => this.subscriberClient.unsubscribe(s.channel));
  }

  async clearAll(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.publisherClient.flushall((err: Error, reply: string) => {
        if (err) {
          this.logError('Failed to flush all', err, reject);
          return;
        }
        this.logger.log('Cleared all redis key/values');
        resolve(reply);
      });
    })
  }

  async set<T>(key: string, value: T) {
    return new Promise((resolve, reject) => {
      this.publisherClient.set(key, JSON.stringify(value), (err: Error, reply) => {
        if (err) {
          this.logError(`Failed to set key ${key}`, err, reject);
          return;
        }
        this.logger.log(`Set key ${key} to cache: ${JSON.stringify(value)}`);
        resolve(reply);
      })
    });
  }

  async get<T>(key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.publisherClient.get(key, (err: Error, reply: string) => {
        if (err) {
          this.logError(`Failed to get key ${key}`, err, reject);
          return;
        }
        const result = JSON.parse(reply) as T;
        resolve(result);
      })
    });
  }

  async publish<T>(channel: string, value: T): Promise<number> {
    return new Promise((resolve, reject) => {
      this.publisherClient.publish(channel, JSON.stringify(value), (err: Error, reply: number) => {
        if (err) {
          this.logError(`Failed to publish to channel ${channel}`, err, reject);
          return;
        }
        this.logger.log(`Published to channel ${channel}: ${JSON.stringify(value)}`);
        resolve(reply);
      })
    });
  }

  async subscribe(channel: string, callback: (response: string) => void): Promise<boolean> {
    return new Promise((resolve) => {
      const subscription = this.subscriptions.find(s => s.channel === channel);
      if (subscription) {
        subscription.callback = callback;
      } else {
        this.subscriptions.push({ channel, callback });
      }
      this.subscriberClient.subscribe(channel);
      this.subscriberClient.on('message', (channel: string, message: string) => {
        const subscription = this.subscriptions.find(s => s.channel);
        if (!subscription) {
          const message = `Failed to consume message from channel ${channel}`;
          this.logger.error(message, new Error(`Redis Err: ${message}`));
          return;
        }
        subscription.callback(message);
      }); 

      this.logger.log(`Subscribed to channel ${channel}`);
      resolve(true);
    });
  }

  private logError(message: string, error: Error, reject: (err?: any) => void) {
    this.logger.error(message, error);
    reject(error);
  }
}
