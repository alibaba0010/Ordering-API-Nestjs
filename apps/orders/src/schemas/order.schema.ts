
import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Order extends AbstractDocument {
  @Prop()
  name: string;
  @Prop()
  address: string; 
  @Prop()
  contact: number;
  @Prop()
  price: number;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
