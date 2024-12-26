import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { HotelService } from 'src/hotel/hotel.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService, HotelService]
})
export class RoomModule {}
