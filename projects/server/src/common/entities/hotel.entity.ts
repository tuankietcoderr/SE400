import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EAuthStrategy, ERole } from '../enum';
import { ENTITY_NAME } from '../constants';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Address } from '../types';

export type HotelDocument = HydratedDocument<Hotel>;

@Schema({ timestamps: true, collection: ENTITY_NAME.HOTEL, autoCreate: true })
export class Hotel {
  _id: Types.ObjectId;

  @Prop({ required: true, index: true })
  name: string;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
