import { Schema } from 'mongoose';

export function extendSchema(
  schema: Schema,
  definition: object,
  options: object
) {
  return new Schema(Object.assign({}, schema.obj, definition), options);
}
