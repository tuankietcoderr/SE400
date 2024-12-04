import { Body, Controller, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingRequestDto } from './booking.dto';
import { SuccessResponse } from 'src/common/responses';
import { CurrentUser, Roles } from 'src/common/decorators';
import { ERole } from 'src/common/enum';
import { User } from 'src/common/entities';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async createBooking(@Body() payload: CreateBookingRequestDto, @CurrentUser() user: User) {
    return new SuccessResponse(
      await this.bookingService.create({
        ...payload,
        user_id: user._id.toString()
      })
    )
      .setMessage('Tạo booking thành công')
      .setStatusCode(HttpStatus.CREATED);
  }

  @Roles([ERole.ADMIN])
  @Get()
  async getBookings() {
    return new SuccessResponse(await this.bookingService.findAll()).setMessage('Danh sách booking');
  }

  @Get(':id')
  async getBookingById(@Param('id') id: string) {
    return new SuccessResponse(await this.bookingService.findByIdOrThrow(id)).setMessage('Thông tin booking');
  }

  @Get('user')
  async getBookingsByUser(@CurrentUser() user: User) {
    return new SuccessResponse(await this.bookingService.findByUserId(user._id.toString())).setMessage(
      'Danh sách booking của user'
    );
  }

  @Roles([ERole.ADMIN])
  @Get('hotel/:hotelId')
  async getBookingsByHotel(@Param('hotelId') hotelId: string) {
    return new SuccessResponse(await this.bookingService.findByHotelId(hotelId)).setMessage(
      'Danh sách booking của khách sạn'
    );
  }

  @Roles([ERole.ADMIN])
  @Put(':id')
  async updateBooking(@Param('id') id: string, @Body() payload: CreateBookingRequestDto) {
    return new SuccessResponse(await this.bookingService.update(id, payload)).setMessage('Cập nhật booking thành công');
  }
}
