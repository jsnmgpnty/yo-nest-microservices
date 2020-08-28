import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { LoggingModule } from '../logging/logging.module';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { EntitySanitizerInterceptor } from './interceptors/entity-sanitizer.interceptor';
import config from '../config';

@Module({
  imports: [LoggingModule.register({ elasticSearch: config.elasticSearch, appName: config.appName })],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ExceptionInterceptor },
    { provide: APP_INTERCEPTOR, useClass: EntitySanitizerInterceptor },
  ],
})
export class CommonModule {}
