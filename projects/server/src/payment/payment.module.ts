import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookingService } from 'src/booking/booking.service';
import { VnpayModule } from 'src/vnpay/vnpay.module';
import { ignoreLogger } from 'vnpay';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentContext } from './payment.strategy';

@Module({
  imports: [
    VnpayModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secureSecret: configService.getOrThrow<string>('VNPAY_HASH_SECRET'),
        tmnCode: configService.getOrThrow<string>('VNPAY_TMN_CODE'),
        loggerFn: ignoreLogger
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentContext, BookingService]
})
export class PaymentModule {}
