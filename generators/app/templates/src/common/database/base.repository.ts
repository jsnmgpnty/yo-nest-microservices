import * as mongoose from 'mongoose';
import * as moment from 'moment';
import { BaseEntity } from '../models';

export class BaseRepository<T extends BaseEntity> {
  protected model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this.model = schemaModel;
  }

  public async create(item: T): Promise<T> {
    item.createdDate = moment.utc(new Date()).toDate();
    item.modifiedDate = moment.utc(new Date()).toDate();
    return (await this.model.create(item)).toJSON() as T;
  }

  public async getAll(): Promise<T[]> {
    return await this.model.find({}).lean().exec() as T[];
  }

  public async update(id: string, item: T): Promise<T> {
    const parsedId = this.toObjectId(id);
    item.modifiedDate = new Date();
    const result = await this.model.update({ _id: parsedId }, item);
    if (result.nModified !== 1) throw new Error(`Failed to update entity ${id}`);
    return this.findById(id);
  }

  public async delete(id: string): Promise<{ ok?: number; n?: number }> {
    return await this.model.remove({ _id: this.toObjectId(id) });
  }

  public async findById(id: string): Promise<T> {
    return await this.model.findById(id).lean().exec() as T;
  }

  public async findOne(cond?: object): Promise<T> {
    return await this.model.findOne(cond).lean().exec() as T;
  }

  public async find(cond?: object, options?: object, sort?: object, skip: number = 0, take: number = 10): Promise<T[]> {
    const result = await this.model.find(cond, options).skip(skip).limit(take).lean().exec();
    return result as T[];
  }

  private toObjectId(id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(id);
  }
}
