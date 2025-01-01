import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from 'src/common/entities';
import { CreateBookingRequestDto, UpdateBookingRequestDto } from './booking.dto';
import * as dayjs from 'dayjs';
import { PaymentService } from 'src/payment/payment.service';
import { EPaymentMethod } from 'src/common/enum';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<BookingDocument>,
    private readonly paymentService: PaymentService
  ) {}

  async create(payload: CreateBookingRequestDto) {
    const bookingId = `BK${dayjs().format('YYYYMMDDHHmmss')}`;
    console.log('bookingId', payload);

    const booking = new this.bookingModel({
      ...payload,
      booking_id: bookingId
    });

    const payment = await this.paymentService.create({
      booking_id: booking.id,
      user_id: payload.user_id,
      total_price: payload.total_price,
      payment_method: payload.payment_method,
      payment_date: payload.payment_method === EPaymentMethod.CASH ? new Date() : null
    });

    booking.payment_id = payment.id;

    return await booking.save();
  }

  async findAll() {
    return await this.bookingModel.find(
      {},
      {},
      {
        populate: [
          {
            path: 'hotel_id',
            select: 'name'
          },
          {
            path: 'room_ids',
            select: 'name'
          },
          {
            path: 'user_id',
            select: 'name'
          },
          {
            path: 'payment_id',
            select: 'transaction_id status'
          }
        ]
      }
    );
  }

  async findById(id: string) {
    return await this.bookingModel.findById(
      id,
      {},
      {
        populate: [
          {
            path: 'hotel_id',
            select: 'name thumbnail location promotions',
            populate: [
              {
                path: 'amenities',
                select: 'name'
              }
            ]
          },
          {
            path: 'room_ids',
            select: 'name capacity images type'
          },
          {
            path: 'user_id',
            select: 'name email phone_number'
          },
          {
            path: 'payment_id'
          }
        ]
      }
    );
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
    return await this.bookingModel
      .find({ user_id: userId }, undefined, {
        populate: [
          {
            path: 'hotel_id',
            select: 'name'
          },
          {
            path: 'room_ids',
            select: 'name'
          },
          {
            path: 'user_id',
            select: 'name'
          },
          {
            path: 'payment_id',
            select: 'transaction_id status'
          }
        ]
      })
      .sort({ createdAt: -1 });
  }

  async update(id: string, payload: UpdateBookingRequestDto) {
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
