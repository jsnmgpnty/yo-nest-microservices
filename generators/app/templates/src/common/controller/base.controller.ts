import { HttpException } from '@nestjs/common';
import * as _ from 'lodash';
import { ErrorInfo, EntityMetadata, BaseEntity, BaseErrors } from '../models';
import { BaseService } from '../services/base.service';

export class BaseController<T extends BaseEntity, TS extends BaseService<T>> {
  constructor (private service: TS) { }

  protected async find(queryString?: string): Promise<EntityMetadata<T[]>> {
    if (!queryString) return await this.service.find(null, null);
    const query = JSON.parse(decodeURIComponent(queryString));
    if (!query) return this.sendErrorResponse(new ErrorInfo(BaseErrors.InvalidArguments, null, 500));
    return await this.service.find(query.filter, query.options, query.sort, query.skip, query.take);
  }

  protected async findById(id: string): Promise<EntityMetadata<T>> {
    return await this.service.findById(id);
  }

  protected async findOne(queryString: string): Promise<EntityMetadata<T>> {
    const query = JSON.parse(decodeURIComponent(queryString));
    if (!query) return this.sendErrorResponse(new ErrorInfo(BaseErrors.InvalidArguments, null, 500));
    return await this.service.findOne(query.filter);
  }

  protected async create(model: T): Promise<EntityMetadata<T>> {
    if (!model) return this.sendErrorResponse(new ErrorInfo(BaseErrors.InvalidArguments, null, 500));
    return await this.service.create(model);
  }

  protected async update(model: T, id: string): Promise<EntityMetadata<T>> {
    return await this.service.update(id, model);
  }

  protected async delete(id: string): Promise<EntityMetadata<boolean>> {
    const existing = await this.findById(id);
    if (!existing) return this.sendErrorResponse(new ErrorInfo(BaseErrors.NotFound, null, 404));
    return await this.service.delete(id);
  }

  sendErrorResponse<TResult>(errorInfo: ErrorInfo): Promise<EntityMetadata<TResult>> {
    throw new HttpException(new EntityMetadata<TResult>(null, errorInfo), errorInfo.statusCode);
  }

  handleResponse<TResult>(results: EntityMetadata<TResult>): Promise<EntityMetadata<TResult>> {
    if (!results) return this.sendErrorResponse(new ErrorInfo(BaseErrors.EmptyResponse, null, 500));
    if (results.error) return this.sendErrorResponse(results.error);
    return Promise.resolve(results);
  }
}
