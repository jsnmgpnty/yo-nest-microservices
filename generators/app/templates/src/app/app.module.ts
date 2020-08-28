import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigOptions } from '../config-options';
import { ExampleModule } from '../example/example.module';

@Module({})
export class AppModule {
  static register(options: ConfigOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [
        MongooseModule.forRoot(options.database.connectionString),
        ExampleModule.register(options),
      ],
    };
  }
}
