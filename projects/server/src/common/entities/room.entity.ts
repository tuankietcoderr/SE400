import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EAuthStrategy, ERole, ERoomType } from '../enum';
import { ENTITY_NAME } from '../constants';
import { Document, HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { RoomAvailability } from '../types/room.type';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true, collection: ENTITY_NAME.ROOM, autoCreate: true })
export class Room {
  _id: Types.ObjectId;

  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true, index: true, enum: Object.values(ERoomType), default: ERoomType.SINGLE })
  type: string;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ required: true, default: 0 })
  capacity: number;

  @Prop({ required: true })
  description: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({ default: [] })
  avaiability: RoomAvailability[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: ENTITY_NAME.HOTEL,
    required: true
  })
  hotel_id: Types.ObjectId;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
