import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EAuthStrategy, ERole } from '../enum';
import { ENTITY_NAME } from '../constants';
import { Document, HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import { Address } from '../types';
import { Hotel } from './hotel.entity';
import { Booking } from './booking.entity';

export type UserDocument = HydratedDocument<User>;
export type AdminDocument = HydratedDocument<Admin>;
export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ timestamps: true, collection: ENTITY_NAME.USER, autoCreate: true, discriminatorKey: 'userKind' })
export class User {
  _id: Types.ObjectId;

  @Prop({ default: ERole.CUSTOMER, enum: Object.values(ERole), index: true })
  role: ERole | string;

  @Prop({ required: true, index: true })
  email: string;

  @Prop({ required: true })
  name: string;
}

@Schema({ timestamps: true, collection: ENTITY_NAME.ADMIN, autoCreate: true })
export class Admin extends User {}

@Schema({ timestamps: true, collection: ENTITY_NAME.CUSTOMER, autoCreate: true })
export class Customer extends User {
  @Prop({ default: EAuthStrategy.LOCAL, enum: Object.values(EAuthStrategy) })
  auth_strategy: EAuthStrategy;

  @Prop({ required: true, index: true })
  phone_number: string;

  @Prop({
    required: true,
    type: Object,
    default: {
      city: '',
      district: '',
      ward: '',
      street: '',
      country: '',
      postal_code: '',
      state: ''
    } as Address
  })
  address: Address;

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

const AdminSchema = SchemaFactory.createForClass(Admin);
const CustomerSchema = SchemaFactory.createForClass(Customer);
const UserSchema = SchemaFactory.createForClass(User);

export { AdminSchema, CustomerSchema, UserSchema };
