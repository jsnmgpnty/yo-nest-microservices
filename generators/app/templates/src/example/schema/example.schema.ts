import { Model, model } from 'mongoose';
import { BaseEntitySchemaOptions, BaseEntitySchema, BaseEntityHooks } from '../../common/schema/base-entity.schema';
import { extendSchema, BaseEntity } from '../../common/models';
import { Example } from '../models/example.entity';

const ExampleSchema = extendSchema(
  BaseEntitySchema,
  {
    name: String,
  },
  BaseEntitySchemaOptions,
  BaseEntityHooks,
);

const ExampleSchemaModel: Model<Example> = model<Example>('Example', ExampleSchema);

export { ExampleSchema, ExampleSchemaModel };
