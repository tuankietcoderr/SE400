import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { HotelService } from 'src/hotel/hotel.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, HotelService],
  exports: [ReviewService]
})
export class ReviewModule {}
