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

const postFindOne = (doc, next) => {
  if (doc && doc['_id']) doc['id'] = doc['_id'].toHexString();
  next();
};

const postFind = (doc, next) => {
  if (isArray(doc)) {
    const list = doc as mongoose.Document[];
    list.forEach(d => {
      if (d && d['_id']) d['id'] = d['_id'].toHexString();
    });
  } else {
    postFindOne(doc, next)
  }
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
};

export { BaseEntitySchema, BaseEntitySchemaOptions, BaseEntityHooks };
