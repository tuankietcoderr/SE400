import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EAuthStrategy, EPaymentMethod, EPaymentStatus, ERole } from '../enum';
import { ENTITY_NAME } from '../constants';
import { Document, HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { Address, RefundDetails } from '../types';
import { Booking } from './booking.entity';
import { User } from './user.entity';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true, collection: ENTITY_NAME.PAYMENT, autoCreate: true })
export class Payment {
  _id: Types.ObjectId;

  @Prop({ required: true, index: true, type: MongooseSchema.Types.ObjectId, ref: 'Booking' })
  booking_id: Types.ObjectId;

  @Prop({ required: true, index: true, type: MongooseSchema.Types.ObjectId, ref: User.name })
  user_id: Types.ObjectId;

  @Prop({ default: 0 })
  total_price: number;

  @Prop({ required: true, enum: Object.values(EPaymentMethod), default: EPaymentMethod.CASH })
  payment_method: EPaymentMethod;

  @Prop({ default: new Date() })
  payment_date: Date | null;

  @Prop({ required: true, enum: Object.values(EPaymentStatus), default: EPaymentStatus.PENDING })
  status: EPaymentStatus;

  @Prop({ required: true })
  transaction_id: string;

  @Prop({ default: null, type: Object })
  refund_details: RefundDetails | null;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
