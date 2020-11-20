import { Injectable } from '@nestjs/common';
import { BaseService, BaseRepository } from '../../common';
import { Example } from '../models/example.entity';
import { LoggerService } from '../../logging/logger.service';

@Injectable()
export class ExampleService extends BaseService<Example>{
  constructor (
    repository: BaseRepository<Example>,
    loggerService: LoggerService,
  ) {
    super(repository, loggerService);
  }
}
