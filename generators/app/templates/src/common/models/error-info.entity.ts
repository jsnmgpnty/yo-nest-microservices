import * as _ from 'lodash';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorInfo {
  @ApiProperty()
  public type?: string;

  @ApiProperty()
  public message?: string;

  @ApiProperty()
  public statusCode?: number;

  error?: any;

  constructor(errorType?: string, message?: string, statusCode?: number, error?: any) {
    if (!_.isNil(errorType)) this.type = errorType;
    if (!_.isNil(error)) this.error = error;
    this.message = !_.isNil(message) ? message : this.type;
    this.statusCode = !_.isNil(statusCode) ? statusCode : 400;
  }
}
