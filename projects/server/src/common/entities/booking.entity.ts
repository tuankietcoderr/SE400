import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { ENTITY_NAME } from '../constants';
import { EBookingStatus, EPaymentMethod, EPaymentStatus } from '../enum';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true, collection: ENTITY_NAME.BOOKING, autoCreate: true })
export class Booking {
  _id: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: ENTITY_NAME.HOTEL, required: true })
  hotel_id: Types.ObjectId;

  @Prop({
    default: [],
    type: [
      {
        ref: ENTITY_NAME.ROOM,
        type: MongooseSchema.Types.ObjectId
      }
    ]
  })
  room_ids: Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: ENTITY_NAME.USER, required: true })
  user_id: Types.ObjectId;

  @Prop({ required: true, default: new Date() })
  check_in_date: Date;

  @Prop({ required: true, default: new Date() })
  check_out_date: Date;

  @Prop({ required: true, default: 0 })
  total_price: number;

  @Prop({ default: EBookingStatus.PENDING, enum: Object.values(EBookingStatus) })
  status: EBookingStatus;

  @Prop({ default: EPaymentStatus.PENDING, enum: Object.values(EPaymentStatus) })
  payment_status: EPaymentStatus;

  @Prop({ default: EPaymentMethod.CASH, enum: Object.values(EPaymentMethod) })
  payment_method: EPaymentMethod;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
