import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EAuthStrategy, ERole } from '../enum';
import { ENTITY_NAME } from '../constants';
import { Document, HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { Hotel } from './hotel.entity';
import { Booking } from './booking.entity';
import { Address } from './address.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: ENTITY_NAME.USER, autoCreate: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ default: ERole.CUSTOMER, enum: Object.values(ERole), index: true })
  role: ERole | string;

  @Prop({ required: true, index: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: EAuthStrategy.LOCAL, enum: Object.values(EAuthStrategy) })
  auth_strategy: EAuthStrategy;

  @Prop({ required: true, index: true })
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
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
