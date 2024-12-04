import { Module } from '@nestjs/common';
import { AmentyController } from './amenty.controller';
import { AmentyService } from './amenty.service';
import { HotelService } from 'src/hotel/hotel.service';

@Module({
  controllers: [AmentyController],
  providers: [AmentyService, HotelService]
})
export class AmentyModule {}
