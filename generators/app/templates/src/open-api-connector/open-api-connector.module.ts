import { Module, DynamicModule } from '@nestjs/common';
import { LoggingModule, LoggerOptions } from '../logging';
import { OpenApiService } from './open-api.service';
import { OpenApiOptions } from './open-api-options';

@Module({ })
export class OpenApiConnectorModule {
  static register (options: OpenApiOptions, logOptions?: LoggerOptions) : DynamicModule {
    OpenApiService.options = options.hosts;

    return {
      module: OpenApiConnectorModule,
      providers: [OpenApiService],
      exports: [OpenApiService],
      imports: [LoggingModule.register(logOptions)],
    };
  }
}
