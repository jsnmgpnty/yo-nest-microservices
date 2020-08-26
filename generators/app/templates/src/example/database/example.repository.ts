import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/database/base.repository';
import { Example } from '../models/example.entity';

@Injectable()
export class ExampleRepository extends BaseRepository<Example> {
}
