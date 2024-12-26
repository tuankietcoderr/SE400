import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AmenityService } from './amenity.service';
import { Roles } from 'src/common/decorators';
import { ERole } from 'src/common/enum';
import { SuccessResponse } from 'src/common/responses';
import { CreateAmenityRequestDto, UpdateAmenityRequestDto } from './amenity.dto';

@Controller('amenity')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  @Roles([ERole.ADMIN])
  @Post()
  async createAmenity(@Body() body: CreateAmenityRequestDto) {
    return new SuccessResponse(await this.amenityService.createAmenity(body)).setMessage('Tạo tiện ích thành công');
  }

  @Roles([ERole.ADMIN])
  @Get()
  async getAmenities() {
    return new SuccessResponse(await this.amenityService.getAmenities()).setMessage('Danh sách tiện ích');
  }

  @Roles([ERole.ADMIN])
  @Get(':id')
  async getAmenityById(@Param('id') id: string) {
    return new SuccessResponse(await this.amenityService.getAmenityByIdOrThrow(id)).setMessage('Thông tin tiện ích');
  }

  @Roles([ERole.ADMIN])
  @Put(':id')
  async updateAmenityInfo(@Param('id') id: string, @Body() body: UpdateAmenityRequestDto) {
    return new SuccessResponse(await this.amenityService.updateAmenityInfo(id, body)).setMessage(
      'Cập nhật thông tin tiện ích thành công'
    );
  }

  @Roles([ERole.ADMIN])
  @Delete(':id')
  async deleteAmenity(@Param('id') id: string) {
    return new SuccessResponse(await this.amenityService.deleteAmenity(id)).setMessage('Xóa tiện ích thành công');
  }
}
