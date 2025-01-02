import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { SearchHotelQueryBuilder } from './hotel.builder';

@Module({
  controllers: [HotelController],
  providers: [HotelService, SearchHotelQueryBuilder],
  exports: [HotelService, SearchHotelQueryBuilder]
})
export class HotelModule {}
