import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class BaseEntity  extends mongoose.Document {
  @ApiProperty()
  @Prop()
  id?: string;

  @ApiProperty()
  @Prop()
  createdDate?: Date;

  @ApiProperty()
  @Prop()
  createdBy?: string;

  @ApiProperty()
  @Prop()
  modifiedDate?: Date;

  @ApiProperty()
  @Prop()
  modifiedBy?: string;
}
