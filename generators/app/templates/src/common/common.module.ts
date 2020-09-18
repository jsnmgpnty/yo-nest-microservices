import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { Module, DynamicModule } from '@nestjs/common';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { EntitySanitizerInterceptor } from './interceptors/entity-sanitizer.interceptor';
import { RequestSanitizerInterceptor } from './interceptors/request-sanitizer.interceptor';
import { AppExceptionFilter } from './filters';

@Module({ })
export class CommonModule {
  static register(): DynamicModule {
    return {
      module: CommonModule,
      providers: [
        { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
        { provide: APP_INTERCEPTOR, useClass: ExceptionInterceptor },
        { provide: APP_INTERCEPTOR, useClass: EntitySanitizerInterceptor },
        { provide: APP_INTERCEPTOR, useClass: RequestSanitizerInterceptor },
        { provide: APP_FILTER, useClass: AppExceptionFilter },
      ]
    };
  }
}
