import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EAuthStrategy, ERole } from '../enum';
import { ENTITY_NAME } from '../constants';
import { Document, HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { Address } from '../types';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true, collection: ENTITY_NAME.REVIEW, autoCreate: true })
export class Review {
  _id: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: ENTITY_NAME.USER, required: true, index: true })
  user_id: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: ENTITY_NAME.HOTEL, required: true, index: true })
  hotel_id: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: ENTITY_NAME.ROOM, index: true, default: null })
  room_id: Types.ObjectId;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ required: true })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
