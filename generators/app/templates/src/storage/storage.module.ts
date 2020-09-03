import { Module, DynamicModule, Global } from '@nestjs/common';
import { LoggerOptions, LoggingModule } from '../logging';
import { StorageService } from './storage.service';
import { StorageOptions } from './storage-options';

@Global()
@Module({ })
export class StorageModule {
  static register (options: StorageOptions) : DynamicModule {
    StorageService.options = options;

    return {
      module: StorageModule,
      providers: [StorageService],
      exports: [StorageService],
    };
  }
}
