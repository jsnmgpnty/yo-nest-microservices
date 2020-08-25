import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../../common/services/base.service';
import { Example } from '../schema/example.entity';
import { LoggerService } from '../../logging/logger.service';

@Injectable()
export class ExampleService extends BaseService<Example>{
  constructor (
    @InjectModel(Example.name) exampleModel: Model<Example>,
    loggerService: LoggerService,
  ) {
    super(exampleModel, loggerService);
  }
}
