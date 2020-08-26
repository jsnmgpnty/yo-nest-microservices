import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class BaseEntity  extends mongoose.Document {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  createdBy?: string;

  @ApiProperty()
  modifiedDate?: Date;

  @ApiProperty()
  modifiedBy?: string;
}
