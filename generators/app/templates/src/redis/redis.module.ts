import { Module, DynamicModule, Global } from '@nestjs/common';
import { RedisOptions } from './redis-options';
import { RedisService } from './redis.service';
import { LoggerOptions } from '../logging';

@Global()
@Module({ })
export class RedisModule {
  static register (options: RedisOptions) : DynamicModule {
    RedisService.redisOptions = options;

    return {
      module: RedisModule,
      providers: [RedisService],
      exports: [RedisService],
    };
  }
}
