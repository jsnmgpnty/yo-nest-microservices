import { Module, DynamicModule, Global } from '@nestjs/common';
import { OpenApiService } from './open-api.service';
import { OpenApiOptions } from './open-api-options';

@Global()
@Module({ })
export class OpenApiConnectorModule {
  static register (options: OpenApiOptions) : DynamicModule {
    OpenApiService.options = options.hosts;

    return {
      module: OpenApiConnectorModule,
      providers: [OpenApiService],
      exports: [OpenApiService],
    };
  }
}
