import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ENTITY_NAME } from '../constants';
import { Document, HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { AddressCodeAndName } from '../types';

export type AddressDocument = HydratedDocument<Address>;

@Schema({ timestamps: true, collection: ENTITY_NAME.ADDRESS, autoCreate: true })
export class Address {
  _id: Types.ObjectId;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true, type: Object })
  province: AddressCodeAndName;

  @Prop({ required: true, type: Object })
  district: AddressCodeAndName;

  @Prop({ required: true, type: Object })
  ward: AddressCodeAndName;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId })
  user_id: Types.ObjectId | string;

  @Prop({ default: false })
  is_default: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
