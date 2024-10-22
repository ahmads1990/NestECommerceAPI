import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ discriminatorKey: 'kind' })
export class User extends Document {
  @Prop({ type: String, required: true, unique: true, _id: true })
  userID: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  passwordHash: string;

  // @Prop({ required: true, enum: ['Vendor', 'Customer'] })
  // kind: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
