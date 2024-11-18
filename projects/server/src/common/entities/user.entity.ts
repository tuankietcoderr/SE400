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

interface UserStrategy {}

@Schema({ timestamps: true, collection: ENTITY_NAME.USER, autoCreate: true, discriminatorKey: 'userKind' })
export class User {
  _id: Types.ObjectId;

  @Prop({ default: ERole.CUSTOMER, enum: Object.values(ERole) })
  role: ERole | string;

  @Prop({ required: true, index: true })
  email: string;

  @Prop({ required: true })
  name: string;
}

@Schema({ timestamps: true, collection: ENTITY_NAME.ADMIN, autoCreate: true })
export class Admin extends User implements UserStrategy {}

@Schema({ timestamps: true, collection: ENTITY_NAME.CUSTOMER, autoCreate: true })
export class Customer extends User implements UserStrategy {
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
        ref: Hotel.name,
        type: MongooseSchema.Types.ObjectId
      }
    ],
    default: []
  })
  favorite_hotels: Types.ObjectId[] | Hotel[];

  @Prop({
    type: [
      {
        ref: Booking.name,
        type: MongooseSchema.Types.ObjectId
      }
    ],
    default: []
  })
  bookings_hotels: Types.ObjectId[] | Booking[];
}

export class UserContext {
  private userStrategy: UserStrategy;

  constructor(userStrategy: UserStrategy) {
    this.userStrategy = userStrategy;
  }

  setStrategy(userStrategy: UserStrategy): void {
    this.userStrategy = userStrategy;
  }

  handle(cb: Function): void {}
}

const AdminSchema = SchemaFactory.createForClass(Admin);
const CustomerSchema = SchemaFactory.createForClass(Customer);
const UserSchema = SchemaFactory.createForClass(User);

export { AdminSchema, CustomerSchema, UserSchema };
