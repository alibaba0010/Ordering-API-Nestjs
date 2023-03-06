
import { Schema, Prop } from '@nestjs/mongoose';
import { SchemaTypes, Types, model } from 'mongoose';

@Schema()
export class User {
  @Prop({ type: SchemaTypes.ObjectId })
  id: Types.ObjectId;

}
