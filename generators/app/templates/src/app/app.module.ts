import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExampleModule } from '../example/example.module';
import config from '../config';

@Module({
  imports: [
    MongooseModule.forRoot(config.database.connectionString),
    ExampleModule,
  ],
})
export class AppModule {}
