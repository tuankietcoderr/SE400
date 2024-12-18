import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address, User } from 'src/common/entities';
import { SuccessResponse } from 'src/common/responses';
import { CurrentUser } from 'src/common/decorators';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() data: Address, @CurrentUser() user: User) {
    return new SuccessResponse(
      await this.addressService.create({
        ...data,
        user_id: user._id.toString()
      })
    )
      .setMessage('Đã tạo địa chỉ')
      .setStatusCode(HttpStatus.CREATED);
  }

  @Get('user')
  async findByUser(@CurrentUser() user: User) {
    return new SuccessResponse(await this.addressService.findByUserId(user._id.toString())).setMessage(
      'Danh sách địa chỉ'
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return new SuccessResponse(await this.addressService.findByIdOrThrow(id)).setMessage('Thông tin địa chỉ');
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Address>) {
    return new SuccessResponse(await this.addressService.update(id, data)).setMessage('Đã cập nhật địa chỉ');
  }

  @Put(':id/default')
  async setDefault(@Param('id') id: string) {
    return new SuccessResponse(await this.addressService.setDefault(id)).setMessage('Đã cập nhật địa chỉ mặc định');
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return new SuccessResponse(await this.addressService.delete(id)).setMessage('Đã xóa địa chỉ');
  }
}
