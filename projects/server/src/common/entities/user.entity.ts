import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EAuthStrategy } from '../enum';
import { ENTITY_NAME } from '../constants';
import { Document, HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: ENTITY_NAME.USER, autoCreate: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ index: true })
  fullName: string;

  @Prop({ default: null, index: false })
  email: string | null;

  @Prop({ enum: Object.values(EAuthStrategy), default: EAuthStrategy.LOCAL })
  authStrategy: string;

  @Prop({ default: null })
  socialId: string;

  @Prop({ default: false })
  isDisabled: boolean;

  @Prop({ default: null })
  disabledAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
