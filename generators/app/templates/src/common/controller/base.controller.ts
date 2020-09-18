import { HttpException } from '@nestjs/common';
import * as _ from 'lodash';
import { ErrorInfo, EntityMetadata, BaseEntity, BaseErrors, AppException } from '../models';
import { BaseService } from '../services/base.service';

export class BaseController<T extends BaseEntity, TS extends BaseService<T>> {
  protected service: TS;

  constructor (service: TS) {
    this.service = service;
  }

  protected async find(queryString?: string): Promise<EntityMetadata<T[]>> {
    if (!queryString) return await this.service.find(null, null);
    const query = JSON.parse(decodeURIComponent(queryString));
    if (!query) return this.sendErrorResponse(new ErrorInfo(BaseErrors.InvalidArguments, null, 400));
    const res = await this.service.find(query.filter, query.options, query.sort, query.skip, query.take);
    return this.handleResponse(res);
  }

  protected async findById(id: string): Promise<EntityMetadata<T>> {
    const res = await this.service.findById(id);
    return this.handleResponse(res);
  }

  protected async findOne(queryString: string): Promise<EntityMetadata<T>> {
    const query = JSON.parse(decodeURIComponent(queryString));
    if (!query) return this.sendErrorResponse(new ErrorInfo(BaseErrors.InvalidArguments, null, 400));
    const res = await this.service.findOne(query.filter);
    return this.handleResponse(res);
  }

  protected async create(model: T): Promise<EntityMetadata<T>> {
    if (!model) return this.sendErrorResponse(new ErrorInfo(BaseErrors.InvalidArguments, null, 400));
    const res = await this.service.create(model);
    return this.handleResponse(res);
  }

  protected async update(model: T, id: string): Promise<EntityMetadata<T>> {
    const res = await this.service.update(id, model);
    return this.handleResponse(res);
  }

  protected async delete(id: string): Promise<EntityMetadata<boolean>> {
    const existing = await this.findById(id);
    if (!existing) return this.sendErrorResponse(new ErrorInfo(BaseErrors.NotFound, null, 404));
    const res = await this.service.delete(id);
    return this.handleResponse(res);
  }

  sendErrorResponse<TResult>(errorInfo: ErrorInfo): Promise<EntityMetadata<TResult>> {
    throw new AppException(errorInfo);
  }

  handleResponse<TResult>(results: EntityMetadata<TResult>): Promise<EntityMetadata<TResult>> {
    if (!results) return this.sendErrorResponse(new ErrorInfo(BaseErrors.EmptyResponse, null, 400));
    if (results.error) return this.sendErrorResponse(results.error);
    return Promise.resolve(results);
  }
}
