import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { Module, DynamicModule } from '@nestjs/common';
import { LoggingModule } from '../logging/logging.module';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { EntitySanitizerInterceptor } from './interceptors/entity-sanitizer.interceptor';
import { ConfigOptions } from '../config-options';

@Module({ })
export class CommonModule {
  static register(config: ConfigOptions): DynamicModule {
    return {
      module: CommonModule,
      imports: [LoggingModule.register({ elasticSearch: config.elasticSearch, appName: config.appName })],
      providers: [
        { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
        { provide: APP_INTERCEPTOR, useClass: ExceptionInterceptor },
        { provide: APP_INTERCEPTOR, useClass: EntitySanitizerInterceptor },
      ]
    };
  }
}
