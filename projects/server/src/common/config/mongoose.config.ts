import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import {
  Amenity,
  AmenitySchema,
  Booking,
  BookingSchema,
  Credential,
  CredentialSchema,
  Hotel,
  HotelSchema,
  Payment,
  PaymentSchema,
  Review,
  ReviewSchema,
  Room,
  RoomSchema,
  User,
  UserSchema
} from 'src/common/entities';
import { Asset, AssetSchema } from '../entities/asset.entity';

const MODELS: ModelDefinition[] = [
  {
    name: User.name,
    schema: UserSchema
  },
  { name: Credential.name, schema: CredentialSchema },
  { name: Amenity.name, schema: AmenitySchema },
  { name: Room.name, schema: RoomSchema },
  { name: Hotel.name, schema: HotelSchema },
  { name: Review.name, schema: ReviewSchema },
  { name: Booking.name, schema: BookingSchema },
  { name: Payment.name, schema: PaymentSchema },
  { name: Asset.name, schema: AssetSchema }
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule]
})
export class MongooseModelsModule {}
