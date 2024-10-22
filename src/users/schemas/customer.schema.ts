import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { CartItem } from './cartItem.schema';

@Schema()
export class Customer extends User {
  @Prop()
  address: string;

  @Prop({ type: [{ type: [CartItem] }] })
  cart: CartItem[];

  @Prop()
  total: number;
}

export const CustomerSchema = UserSchema.discriminator(
  Customer.name,
  SchemaFactory.createForClass(Customer),
);
