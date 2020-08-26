import * as mongoose from 'mongoose';

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

BaseEntitySchema.pre('save', function (next) {
  const now = new Date();
  if (!this.get('createdDate')) {
    this.set('createdDate', now);
  }

  if (!this.get('modifiedDate')) {
    this.set('modifiedDate', now);
  }

  next();
});

BaseEntitySchema.set('toJSON', {
  virtuals: true,
});

BaseEntitySchema.set('toObject', {
  virtuals: true,
});

BaseEntitySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { BaseEntitySchema, BaseEntitySchemaOptions };
