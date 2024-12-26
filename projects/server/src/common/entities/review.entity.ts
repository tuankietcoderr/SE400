import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EAuthStrategy, ERole } from '../enum';
import { ENTITY_NAME } from '../constants';
import { Document, HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { Address } from '../types';
import { Hotel } from './hotel.entity';
import { Room } from './room.entity';
import { User } from './user.entity';
import { Booking } from './booking.entity';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true, collection: ENTITY_NAME.REVIEW, autoCreate: true })
export class Review {
  _id: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true, index: true })
  user_id: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Hotel.name, required: true, index: true })
  hotel_id: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Room.name, index: true, default: null })
  room_id: Types.ObjectId;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ required: true })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
