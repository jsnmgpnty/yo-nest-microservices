import * as mongoose from 'mongoose';
import { isArray } from 'lodash';
import { SchemaHooks } from './schema-hooks';

const BaseEntitySchemaOptions: mongoose.SchemaOptions = {
  toJSON: { virtuals: true, versionKey: false },
  toObject: { virtuals: true, versionKey: false },
};

const BaseEntitySchema: mongoose.Schema = new mongoose.Schema({
  createdBy: String,
  createdDate: Date,
  modifiedBy: String,
  modifiedDate: Date,
}, BaseEntitySchemaOptions);

const postFindOne = (doc) => {
  doc.id = doc._id.toHexString();
};

const postFind = (doc) => {
  if (isArray(doc)) {
    const list = doc as Document[];
    list.forEach(d => postFindOne(d));
  } else {
    postFindOne(doc)
  }
};

const preSave = (next) => {
  const now = new Date();
  if (!this.get('createdDate')) this.set('createdDate', now);
  if (!this.get('modifiedDate')) this.set('modifiedDate', now);
  next();
};

BaseEntitySchema.set('toJSON', {
  virtuals: true,
});

BaseEntitySchema.set('toObject', {
  virtuals: true,
});

BaseEntitySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const BaseEntityHooks: SchemaHooks = {
  postFindOne,
  postFind,
  preSave,
};

export { BaseEntitySchema, BaseEntitySchemaOptions, BaseEntityHooks };
