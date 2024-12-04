import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewRequestDto } from './review.dto';
import { CurrentUser, Public, Roles } from 'src/common/decorators';
import { User } from 'src/common/entities';
import { SuccessResponse } from 'src/common/responses';
import { ERole } from 'src/common/enum';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(@Body() payload: CreateReviewRequestDto, @CurrentUser() user: User) {
    return new SuccessResponse(
      await this.reviewService.create({
        ...payload,
        user_id: user._id.toString()
      })
    )
      .setMessage('Tạo đánh giá thành công')
      .setStatusCode(HttpStatus.CREATED);
  }

  @Roles([ERole.ADMIN])
  @Get()
  async getReviews() {
    return new SuccessResponse(await this.reviewService.findAll()).setMessage('Danh sách đánh giá');
  }

  @Get('user')
  async getReviewsByUser(@CurrentUser() user: User) {
    return new SuccessResponse(await this.reviewService.findByUserId(user._id.toString())).setMessage(
      'Danh sách đánh giá của user'
    );
  }

  @Public()
  @Get(':id')
  async getReviewById(@Param('id') id: string) {
    return new SuccessResponse(await this.reviewService.findByIdOrThrow(id)).setMessage('Thông tin đánh giá');
  }

  @Public()
  @Get('hotel/:hotelId')
  async getReviewsByHotel(@Param('hotelId') hotelId: string) {
    return new SuccessResponse(await this.reviewService.findByHotelId(hotelId)).setMessage(
      'Danh sách đánh giá của khách sạn'
    );
  }

  @Public()
  @Get('room/:roomId')
  async getReviewsByRoom(@Param('roomId') roomId: string) {
    return new SuccessResponse(await this.reviewService.findByRoomId(roomId)).setMessage(
      'Danh sách đánh giá của phòng'
    );
  }

  @Put(':id')
  async updateReview(@Param('id') id: string, @Body() payload: CreateReviewRequestDto) {
    return new SuccessResponse(await this.reviewService.update(id, payload)).setMessage('Cập nhật đánh giá thành công');
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return new SuccessResponse(await this.reviewService.delete(id)).setMessage('Xóa đánh giá thành công');
  }
}
