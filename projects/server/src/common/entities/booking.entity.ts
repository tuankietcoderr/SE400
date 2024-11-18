import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EAuthStrategy, ERole } from '../enum';
import { ENTITY_NAME } from '../constants';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Address } from '../types';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true, collection: ENTITY_NAME.BOOKING, autoCreate: true })
export class Booking {
  _id: Types.ObjectId;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
