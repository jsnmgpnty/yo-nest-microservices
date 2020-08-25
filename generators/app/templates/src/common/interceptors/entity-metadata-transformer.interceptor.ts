import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityMetadata, ErrorInfo, BaseErrors } from '../models';

@Injectable()
export class EntityMetadataTransformerInterceptor<T> implements NestInterceptor<T, EntityMetadata<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<EntityMetadata<T>> {
    return next
      .handle()
      .pipe(
        map(data => {
          if (!data) return new EntityMetadata(null, new ErrorInfo(BaseErrors.EmptyResponse, BaseErrors.EmptyResponse, 500));
          return new EntityMetadata(data);
        })
      );
  }
}
