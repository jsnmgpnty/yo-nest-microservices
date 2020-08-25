import { Module, DynamicModule } from '@nestjs/common';
import { LoggingModule } from 'src/logging/logging.module';
import { RedisOptions } from './redis-options';
import { RedisService } from './redis.service';
import { LoggerOptions } from '../logging';

@Module({ })
export class RedisModule {
  static register (options: RedisOptions, logOptions?: LoggerOptions) : DynamicModule {
    RedisService.redisOptions = options;

    return {
      module: RedisModule,
      providers: [RedisService],
      exports: [RedisService],
      imports: [LoggingModule.register(logOptions)],
    };
  }
}
