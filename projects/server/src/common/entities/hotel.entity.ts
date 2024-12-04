import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { ENTITY_NAME } from '../constants';
import { HotelType } from '../enum';
import { Location, Promotion } from '../types';
import { Amenty } from './amenty.entity';

export type HotelDocument = HydratedDocument<Hotel>;

@Schema({ timestamps: true, collection: ENTITY_NAME.HOTEL, autoCreate: true })
export class Hotel {
  _id: Types.ObjectId;

  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true, index: true, enum: Object.values(HotelType) })
  type: HotelType;

  @Prop({ required: true, type: Object })
  location: Location;

  @Prop({ default: 0 })
  rating: number;

  @Prop({
    type: [
      {
        ref: Amenty.name,
        type: MongooseSchema.Types.ObjectId
      }
    ],
    default: []
  })
  amenties: Types.ObjectId[];

  @Prop({ required: true })
  description: string;

  @Prop({ default: null })
  thumbnail: string | null;

  @Prop({
    default: [],
    type: [
      {
        ref: ENTITY_NAME.ROOM,
        type: MongooseSchema.Types.ObjectId
      }
    ]
  })
  rooms: Types.ObjectId[];

  @Prop({ default: [] })
  promotions: Promotion[];
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
