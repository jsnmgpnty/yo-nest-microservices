import * as mongoose from 'mongoose';

export interface SchemaHooks {
  postFindOne?: (doc: mongoose.Document, next: (err?: mongoose.NativeError) => void) => void;
  postFind?: (doc: mongoose.Document, next: (err?: mongoose.NativeError) => void) => void;
  preSave?: (next: mongoose.HookNextFunction) => void;
}
