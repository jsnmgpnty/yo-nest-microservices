import { Schema } from 'mongoose';
import { SchemaHooks } from '../schema/schema-hooks';

export function extendSchema(
  schema: Schema,
  definition: object,
  options: object,
  hooks: SchemaHooks = null,
) {
  const ExtendedSchema = new Schema(Object.assign({}, schema.obj, definition), options);
  if (hooks?.postFind) ExtendedSchema.post('find', hooks.postFind);
  if (hooks?.postFindOne) ExtendedSchema.post('findOne', hooks.postFindOne);
  if (hooks?.preSave) ExtendedSchema.pre('save', hooks.preSave);
  return ExtendedSchema;
};
