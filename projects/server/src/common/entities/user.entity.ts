import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EAuthStrategy, ENotificationType, ERole } from '../enum';
import { ENTITY_NAME } from '../constants';
import { Document, HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { Hotel } from './hotel.entity';
import { Booking } from './booking.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: ENTITY_NAME.USER, autoCreate: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ default: ERole.CUSTOMER, enum: Object.values(ERole), index: true })
  role: ERole | string;

  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: EAuthStrategy.LOCAL, enum: Object.values(EAuthStrategy) })
  auth_strategy: EAuthStrategy;

  @Prop({ index: true, unique: true, default: null })
  phone_number: string;

  @Prop({
    type: [
      {
        ref: ENTITY_NAME.HOTEL,
        type: MongooseSchema.Types.ObjectId
      }
    ],
    default: []
  })
  favorite_hotels: Types.ObjectId[] | Hotel[];

  @Prop({
    type: [
      {
        ref: ENTITY_NAME.BOOKING,
        type: MongooseSchema.Types.ObjectId
      }
    ],
    default: []
  })
  bookings_hotels: Types.ObjectId[] | Booking[];

  @Prop({ default: [ENotificationType.EMAIL], type: [String] })
  notification_types: ENotificationType[];
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
