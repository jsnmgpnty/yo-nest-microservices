import { DynamicModule, Logger, Module, OnModuleInit } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerOptions } from './logger-options.model';

@Module({})
export class LoggingModule {
  static register (loggerOptions?: LoggerOptions) : DynamicModule {
    return {
      module: LoggingModule,
      providers: [
        {
          provide: LoggerService,
          useValue: new LoggerService(loggerOptions),
        },
      ],
      exports: [LoggerService],
    };
  }
}
