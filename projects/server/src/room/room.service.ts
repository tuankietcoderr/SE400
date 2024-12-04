import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from 'src/common/entities';
import { CreateRoomRequestDto, UpdateRoomRequestDto } from './room.dto';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>) {}

  async create(room: CreateRoomRequestDto) {
    return this.roomModel.create(room);
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
    return room;
  }
}
