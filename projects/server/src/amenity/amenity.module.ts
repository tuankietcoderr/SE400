import { Module } from '@nestjs/common';
import { AmenityController } from './amenity.controller';
import { AmenityService } from './amenity.service';
import { HotelService } from 'src/hotel/hotel.service';

@Module({
  controllers: [AmenityController],
  providers: [AmenityService, HotelService]
})
export class AmenityModule {}
