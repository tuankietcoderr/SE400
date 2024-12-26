import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { RoomService } from './room.service';
import { Public, Roles } from 'src/common/decorators';
import { ERole } from 'src/common/enum';
import { CreateRoomRequestDto, UpdateRoomRequestDto } from './room.dto';
import { SuccessResponse } from 'src/common/responses';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Roles([ERole.ADMIN])
  @Post()
  async create(@Body() room: CreateRoomRequestDto) {
    return new SuccessResponse(await this.roomService.create(room))
      .setStatusCode(HttpStatus.CREATED)
      .setMessage('Tạo phòng thành công');
  }

  @Roles([ERole.ADMIN])
  @Get()
  async findAll() {
    return new SuccessResponse(await this.roomService.findAll());
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: string) {
    return new SuccessResponse(await this.roomService.findById(id));
  }

  @Public()
  @Get('hotel/:hotelId')
  async findByHotelId(@Param('hotelId') hotelId: string) {
    return new SuccessResponse(await this.roomService.findByHotelId(hotelId));
  }

  @Roles([ERole.ADMIN])
  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateRoomRequestDto) {
    return new SuccessResponse(await this.roomService.update(id, payload)).setMessage('Cập nhật phòng thành công');
  }

  @Roles([ERole.ADMIN])
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return new SuccessResponse(await this.roomService.delete(id)).setMessage('Xóa phòng thành công');
  }
}
