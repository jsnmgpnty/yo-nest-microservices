import { Model, model } from 'mongoose';
import { BaseEntitySchemaOptions, BaseEntitySchema } from '../../common/schema/base-entity.schema';
import { extendSchema } from '../../common/models';
import { Example } from '../models/example.entity';

const ExampleSchema = extendSchema(
  BaseEntitySchema,
  {
    name: String,
  },
  BaseEntitySchemaOptions,
);

const ExampleSchemaModel: Model<Example> = model<Example>('Example', ExampleSchema);

export { ExampleSchema, ExampleSchemaModel };
