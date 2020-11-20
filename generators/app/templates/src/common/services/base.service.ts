import * as _ from 'lodash';
import { Document, Model, Types } from 'mongoose';
import { BaseRepository } from '../database/base.repository';
import { EntityMetadata, ErrorInfo, BaseEntity, BaseErrors } from '../models';
import { LoggerService } from '../../logging/logger.service';

export class BaseService<T extends BaseEntity> {
  constructor(private repository: BaseRepository<T>, private loggerService: LoggerService) {
  }

  public async create(item: T): Promise<EntityMetadata<T>> {
    try {
      const result = await this.repository.create(item);
      if (!result) return this.convertToEntityMetadata<T>(null, null);
      return this.convertToEntityMetadata(null, result);
    } catch (error) {
      const errInfo = new ErrorInfo(BaseErrors.FailedToCreateResource, null, 400, error);
      return this.convertToEntityMetadata<T>(errInfo);
    }
  }

  public async getAll(): Promise<EntityMetadata<T[]>> {
    try {
      const result = await this.repository.getAll();
      if (!result) return this.convertToEntityMetadata<T[]>(null, null);
      return this.convertToEntityMetadata<T[]>(null, result);
    } catch (error) {
      const errInfo = new ErrorInfo(BaseErrors.UnhandledError, null, 400, error);
      return this.convertToEntityMetadata<T[]>(errInfo);
    }
  }

  public async update(id: string, item: T): Promise<EntityMetadata<T>> {
    try {
      const existing = await this.findById(id);
      if (!existing) return this.convertToEntityMetadata(new ErrorInfo(BaseErrors.NotFound, null, 404));
      const result = await this.repository.update(id, item);
      if (!result) return this.convertToEntityMetadata<T>(null, null);
      return this.convertToEntityMetadata<T>(null, result);
    } catch (error) {
      const errInfo = new ErrorInfo(BaseErrors.FailedToUpdateResource, null, 400, error);
      return this.convertToEntityMetadata<T>(errInfo);
    }
  }

  public async delete(id: string): Promise<EntityMetadata<boolean>> {
    try {
      const existing = await this.findById(id);
      if (!existing) {
        return this.convertToEntityMetadata<boolean>(
          new ErrorInfo(
            BaseErrors.NotFound,
            BaseErrors.NotFound,
            404,
          )
        );
      }

      const result = await this.repository.delete(id);
      if (!result) return this.convertToEntityMetadata<boolean>(null, null);
      if (!_.isNil(result.ok) && result.ok > 0) return this.convertToEntityMetadata<boolean>(null, true);
      return this.convertToEntityMetadata<boolean>(
        new ErrorInfo(BaseErrors.FailedToDeleteResource, null, 400)
      );
    } catch (error) {
      const errInfo = new ErrorInfo(BaseErrors.FailedToDeleteResource, null, 400, error);
      return this.convertToEntityMetadata<boolean>(errInfo);
    }
  }

  public async findById(id: string): Promise<EntityMetadata<T>> {
    try {
      const result = await this.repository.findById(id);
      if (!result) return this.convertToEntityMetadata<T>(null, null);
      return this.convertToEntityMetadata<T>(null, result);
    } catch (error) {
      const errInfo = new ErrorInfo(BaseErrors.UnhandledError, null, 400, error);
      return this.convertToEntityMetadata<T>(errInfo);
    }
  }

  public async findOne(cond?: object): Promise<EntityMetadata<T>> {
    try {
      const result = await this.repository.findOne(cond);
      if (!result) return this.convertToEntityMetadata<T>(null, null);
      return this.convertToEntityMetadata<T>(null, result);
    } catch (error) {
      const errInfo = new ErrorInfo(BaseErrors.UnhandledError, null, 400, error);
      return this.convertToEntityMetadata<T>(errInfo);
    }
  }

  public async find(
    cond?: object,
    options?: object,
    sort?: object,
    skip: number = 0,
    take: number = 15,
  ): Promise<EntityMetadata<T[]>> {
    try {
      const result = await this.repository.find(cond, options, sort, skip, take);
      if (!result) return this.convertToEntityMetadata<T[]>(null, null);
      return this.convertToEntityMetadata<T[]>(null, result);
    } catch (error) {

      const errInfo = new ErrorInfo(BaseErrors.UnhandledError, null, 400, error);
      return this.convertToEntityMetadata<T[]>(errInfo);
    }
  }

  protected convertToEntityMetadata<TResult>(
    err?: ErrorInfo,
    result?: TResult | undefined | null
  ): EntityMetadata<TResult> {
    if (err) return this.getErrorEntityMetadata(err.message, err.type, err.statusCode, err.error);
    if (result) return this.getSuccessEntityMetadata(result);
    const error: ErrorInfo = new ErrorInfo(BaseErrors.EmptyResponse, null, 400);
    return new EntityMetadata<TResult>(undefined, error);
  }

  protected getErrorEntityMetadata<TResult>(
    type: string,
    message: string,
    statusCode: number = 400,
    error: any = null,
  ): EntityMetadata<TResult> {
    this.loggerService.error(`${type} - ${message}`, error);
    const errInfo: ErrorInfo = new ErrorInfo(type, message, statusCode, error);
    return new EntityMetadata<TResult>(undefined, errInfo);
  }

  protected getSuccessEntityMetadata<TResult>(data: TResult): EntityMetadata<TResult> {
    return new EntityMetadata<TResult>(data);
  }
}
