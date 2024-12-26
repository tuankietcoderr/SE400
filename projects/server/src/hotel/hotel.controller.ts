import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { SuccessResponse } from 'src/common/responses';
import { Public, Roles } from 'src/common/decorators';
import { ERole } from 'src/common/enum';
import { CreateHotelRequestDto, UpdateHotelRequestDto } from './hotel.dto';
import { Address } from 'src/common/types';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Public()
  @Get('/search')
  async searchHotels(@Query() payload: Pick<Address, 'district' | 'province' | 'ward'>) {
    return new SuccessResponse(await this.hotelService.searchHotels(payload)).setMessage('Danh sách khách sạn');
  }

  @Public()
  @Get()
  async getHotels() {
    return new SuccessResponse(await this.hotelService.getHotels()).setMessage('Danh sách khách sạn');
  }

  @Public()
  @Get(':id/relative')
  async getRelativeHotels(@Param('id') id: string) {
    return new SuccessResponse(await this.hotelService.getRelativeHotels(id)).setMessage(
      'Danh sách khách sạn liên quan'
    );
  }

  @Public()
  @Get(':id')
  async getHotelById(@Param('id') id: string) {
    return new SuccessResponse(await this.hotelService.getHotelByIdOrThrow(id)).setMessage('Thông tin khách sạn');
  }

  @Roles([ERole.ADMIN])
  @Post()
  async createHotel(@Body() body: CreateHotelRequestDto) {
    return new SuccessResponse(await this.hotelService.createHotel(body)).setMessage('Tạo khách sạn thành công');
  }

  @Roles([ERole.ADMIN])
  @Put(':id')
  async updateHotelInfo(@Param('id') id: string, @Body() body: UpdateHotelRequestDto) {
    return new SuccessResponse(await this.hotelService.updateHotelInfo(id, body)).setMessage(
      'Cập nhật thông tin khách sạn thành công'
    );
  }

  @Roles([ERole.ADMIN])
  @Delete(':id')
  async deleteHotel(@Param('id') id: string) {
    return new SuccessResponse(await this.hotelService.deleteHotel(id)).setMessage('Xóa khách sạn thành công');
  }
}
