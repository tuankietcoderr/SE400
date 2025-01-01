import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from 'src/common/entities';
import { CreateReviewRequestDto } from './review.dto';
import { HotelService } from 'src/hotel/hotel.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<ReviewDocument>,
    private readonly hotelService: HotelService
  ) {}

  async create(payload: CreateReviewRequestDto) {
    const hotel = await this.hotelService.getHotelByIdOrThrow(payload.hotel_id);
    hotel.rating_count += 1;
    hotel.rating = (hotel.rating * (hotel.rating_count - 1) + payload.rating) / hotel.rating_count;
    await hotel.save();
    return await this.reviewModel.create(payload);
  }

  async findAll() {
    return await this.reviewModel.find(
      {},
      {},
      {
        populate: [
          {
            path: 'user_id',
            select: 'name'
          },
          {
            path: 'hotel_id',
            select: 'name'
          },
          {
            path: 'room_id',
            select: 'name'
          }
        ]
      }
    );
  }

  async findById(id: string) {
    return await this.reviewModel.findById(id);
  }

  async findByIdOrThrow(id: string) {
    const review = await this.findById(id);
    if (!review) {
      throw new NotFoundException('Không tìm thấy đánh giá');
    }
    return review;
  }

  async findByUserId(userId: string) {
    return await this.reviewModel.find({ user_id: userId }, undefined, {
      populate: [
        {
          path: 'user_id',
          select: 'name'
        },
        {
          path: 'room_id',
          select: 'name price'
        }
      ]
    });
  }

  async findByHotelId(hotelId: string) {
    return await this.reviewModel.find(
      { hotel_id: hotelId },
      {},
      {
        populate: [
          {
            path: 'user_id',
            select: 'name'
          },
          {
            path: 'room_id',
            select: 'name price'
          }
        ]
      }
    );
  }

  async findByRoomId(roomId: string) {
    return await this.reviewModel.find({ room_id: roomId });
  }

  async update(id: string, payload: CreateReviewRequestDto) {
    const review = await this.reviewModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
    if (!review) {
      throw new NotFoundException('Không tìm thấy đánh giá');
    }

    return review;
  }

  async delete(id: string) {
    const review = await this.reviewModel.findByIdAndDelete(id);
    if (!review) {
      throw new NotFoundException('Không tìm thấy đánh giá');
    }
    return review;
  }
}
