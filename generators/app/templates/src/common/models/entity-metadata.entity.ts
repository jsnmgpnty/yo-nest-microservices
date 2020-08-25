import * as _ from 'lodash';
import { ApiProperty } from '@nestjs/swagger';
import { ErrorInfo } from './error-info.entity';

export class EntityMetadata<TEntity> {
  @ApiProperty()
  data?: TEntity;

  @ApiProperty()
  error?: ErrorInfo;

  constructor(data?: TEntity, error?: ErrorInfo) {
    if (!_.isNil(data)) this.data = data;
    if (!_.isNil(error)) this.error = error;
  }
}
