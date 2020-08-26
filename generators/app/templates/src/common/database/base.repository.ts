import * as mongoose from 'mongoose';
import * as moment from 'moment';
import { BaseEntity } from '../models';

export class BaseRepository<T extends BaseEntity> {
  private model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this.model = schemaModel;
  }

  public async create(item: T): Promise<T> {
    item.createdDate = moment.utc(new Date()).toDate();
    item.modifiedDate = moment.utc(new Date()).toDate();
    return this.model.create(item) as Promise<T>;
  }

  public async getAll(): Promise<T[]> {
    const result = this.model.find({});
    return result.exec() as Promise<T[]>;
  }

  public async update(id: string, item: T): Promise<T> {
    const parsedId = this.toObjectId(id);
    item.modifiedDate = new Date();
    const result = this.model.update({ _id: parsedId }, item);
    if (result.nModified !== 1) throw new Error(`Failed to update entity ${id}`);
    return this.findById(id);
  }

  public async delete(id: string): Promise<{ ok?: number; n?: number }> {
    const result = this.model.remove({ _id: this.toObjectId(id) });
    return result.exec();
  }

  public async findById(id: string): Promise<T> {
    const result = this.model.findById(id);
    return result.exec() as Promise<T>;
  }

  public async findOne(cond?: object): Promise<T> {
    const result = this.model.findOne(cond);
    return result.exec() as Promise<T>;
  }

  public async find(cond?: object, options?: object, sort?: object, skip: number = 0, take: number = 10): Promise<T[]> {
    const result = this.model.find(cond, options).skip(skip).limit(take);
    return result.exec() as Promise<T[]>;
  }

  private toObjectId(id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(id);
  }
}
