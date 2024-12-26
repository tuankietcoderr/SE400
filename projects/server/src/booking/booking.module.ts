import { Module } from '@nestjs/common';
import { PaymentService } from 'src/payment/payment.service';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [],
  controllers: [BookingController],
  providers: [BookingService, PaymentService]
})
export class BookingModule {}
