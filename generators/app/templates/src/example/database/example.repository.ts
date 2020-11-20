import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/database/base.repository';
import { Example } from '../models/example.entity';

@Injectable()
export class ExampleRepository extends BaseRepository<Example> {
  constructor (@InjectModel(Example.name) exampleModel: Model<Example>) {
    super(exampleModel);
  }
}
