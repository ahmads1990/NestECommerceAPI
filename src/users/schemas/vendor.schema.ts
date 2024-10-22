import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Types } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';

@Schema()
export class Vendor extends User {
  @Prop()
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  productCatalog: Types.ObjectId[];
}

export const VendorSchema = UserSchema.discriminator(
  Vendor.name,
  SchemaFactory.createForClass(Vendor),
);
