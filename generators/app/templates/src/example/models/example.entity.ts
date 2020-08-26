import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/models';

export class Example extends BaseEntity {
  @ApiProperty()
  name: string;
}