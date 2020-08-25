import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Example extends Document {
  @Prop()
  name: string;
}

export const ExampleSchema = SchemaFactory.createForClass(Example);