import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModelsModule } from './common/config/mongoose.config';
import { GlobalConfigModule } from './common/config/config.config';
import { DatabaseModule } from './common/config/database.config';
import { AuthModule } from './auth/auth.module';
import { CredentialService } from './credential/credential.service';
import { CredentialModule } from './credential/credential.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
import { HotelModule } from './hotel/hotel.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { ReviewModule } from './review/review.module';
import { AmentyModule } from './amenty/amenty.module';
import { PaymentModule } from './payment/payment.module';
import { UploadModule } from './upload/upload.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { AssetModule } from './asset/asset.module';
import { AddressModule } from './address/address.module';
import * as multer from 'multer';
@Module({
  imports: [
    MulterModule.register({
      storage: multer.memoryStorage()
    }),
    GlobalConfigModule,
    DatabaseModule,
    MongooseModelsModule,
    AuthModule,
    CredentialModule,
    UserModule,
    LoggerModule,
    HotelModule,
    RoomModule,
    BookingModule,
    ReviewModule,
    AmentyModule,
    PaymentModule,
    UploadModule,
    CloudinaryModule,
    AssetModule,
    AddressModule
  ],
  controllers: [AppController],
  providers: [AppService, CredentialService]
})
export class AppModule {}
