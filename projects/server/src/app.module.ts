import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { AmenityModule } from './amenity/amenity.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetModule } from './asset/asset.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { GlobalConfigModule } from './common/config/config.config';
import { DatabaseModule } from './common/config/database.config';
import { MongooseModelsModule } from './common/config/mongoose.config';
import { CredentialModule } from './credential/credential.module';
import { CredentialService } from './credential/credential.service';
import { HotelModule } from './hotel/hotel.module';
import { LoggerModule } from './logger/logger.module';
import { PaymentModule } from './payment/payment.module';
import { ReviewModule } from './review/review.module';
import { RoomModule } from './room/room.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { VnpayModule } from './vnpay/vnpay.module';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationsModule } from './notifications/notifications.module';
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
    AmenityModule,
    PaymentModule,
    UploadModule,
    CloudinaryModule,
    AssetModule,
    VnpayModule,
    NotificationsModule
  ],
  controllers: [AppController, NotificationsController],
  providers: [AppService, CredentialService]
})
export class AppModule {}
