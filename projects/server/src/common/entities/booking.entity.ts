import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { ENTITY_NAME } from '../constants';
import { EBookingStatus, EPaymentMethod, EPaymentStatus } from '../enum';
import { Hotel } from './hotel.entity';
import { Room } from './room.entity';
import { User } from './user.entity';
import { Payment } from './payment.entity';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true, collection: ENTITY_NAME.BOOKING, autoCreate: true })
export class Booking {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  booking_id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Hotel.name, required: true })
  hotel_id: Types.ObjectId;

  @Prop({
    default: [],
    type: [
      {
        ref: Room.name,
        type: MongooseSchema.Types.ObjectId
      }
    ]
  })
  room_ids: Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  user_id: Types.ObjectId;

  @Prop({ required: true, default: new Date() })
  check_in_date: Date;

  @Prop({ required: true, default: new Date() })
  check_out_date: Date;

  @Prop({ required: true, default: 0 })
  total_price: number;

  @Prop({ default: EBookingStatus.PENDING, enum: Object.values(EBookingStatus) })
  status: EBookingStatus;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Payment.name, default: null })
  payment_id: Types.ObjectId;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
