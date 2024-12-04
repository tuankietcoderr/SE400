import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from 'src/common/entities';
import { CreateBookingRequestDto } from './booking.dto';

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking.name) private readonly bookingModel: Model<BookingDocument>) {}

  async create(booking: CreateBookingRequestDto) {
    return await this.bookingModel.create(booking);
  }

  async findAll() {
    return await this.bookingModel.find();
  }

  async findById(id: string) {
    return await this.bookingModel.findById(id);
  }

  async findByIdOrThrow(id: string) {
    const booking = await this.findById(id);
    if (!booking) {
      throw new NotFoundException('Không tìm thấy booking');
    }
    return booking;
  }

  async findByHotelId(hotelId: string) {
    return await this.bookingModel.find({ hotel_id: hotelId });
  }

  async findByUserId(userId: string) {
    return await this.bookingModel.find({ user_id: userId });
  }

  async update(id: string, payload: CreateBookingRequestDto) {
    const booking = await this.bookingModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
    if (!booking) {
      throw new NotFoundException('Không tìm thấy thấy booking');
    }
    return booking;
  }

  async delete(id: string) {
    const booking = await this.bookingModel.findByIdAndDelete(id);
    if (!booking) {
      throw new NotFoundException('Không tìm thấy booking');
    }
    return booking;
  }
}
