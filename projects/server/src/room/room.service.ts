import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from 'src/common/entities';
import { CreateRoomRequestDto, UpdateRoomRequestDto } from './room.dto';
import { HotelService } from 'src/hotel/hotel.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
    private readonly hotelService: HotelService
  ) {}

  async create(room: CreateRoomRequestDto) {
    const newRom = new this.roomModel(room);

    const hotel = await this.hotelService.getHotelByIdOrThrow(room.hotel_id);
    hotel.rooms.push(newRom._id);
    await hotel.save();

    return await newRom.save();
  }

  async findAll() {
    return this.roomModel.find();
  }

  async findById(id: string) {
    return this.roomModel.findById(id);
  }

  async findByIdOrThrow(id: string) {
    const room = await this.findById(id);
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng');
    }
    return room;
  }

  async findByHotelId(hotelId: string) {
    return await this.roomModel.find({
      hotel_id: hotelId
    });
  }

  async update(id: string, payload: UpdateRoomRequestDto) {
    const room = await this.roomModel.findByIdAndUpdate(
      id,
      {
        $set: payload
      },
      { new: true }
    );
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng');
    }
    return room;
  }

  async delete(id: string) {
    const room = await this.roomModel.findByIdAndDelete(id);
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng');
    }
    const hotel = await this.hotelService.getHotelByIdOrThrow(room.hotel_id.toString());
    hotel.rooms = hotel.rooms.filter((roomId) => roomId.toString() !== id);
    await hotel.save();
    return room;
  }
}
