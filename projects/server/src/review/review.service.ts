import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from 'src/common/entities';
import { CreateReviewRequestDto } from './review.dto';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private readonly reviewModel: Model<ReviewDocument>) {}

  async create(payload: CreateReviewRequestDto) {
    return await this.reviewModel.create(payload);
  }

  async findAll() {
    return await this.reviewModel.find();
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
    return await this.reviewModel.find({ user_id: userId });
  }

  async findByHotelId(hotelId: string) {
    return await this.reviewModel.find({ hotel_id: hotelId });
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
