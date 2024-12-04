import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AmentyService } from './amenty.service';
import { Roles } from 'src/common/decorators';
import { ERole } from 'src/common/enum';
import { SuccessResponse } from 'src/common/responses';
import { CreateAmentyRequestDto, UpdateAmentyRequestDto } from './amenty.dto';

@Controller('amenty')
export class AmentyController {
  constructor(private readonly amentyService: AmentyService) {}

  @Roles([ERole.ADMIN])
  @Post()
  async createAmenty(@Body() body: CreateAmentyRequestDto) {
    return new SuccessResponse(await this.amentyService.createAmenty(body)).setMessage('Tạo tiện ích thành công');
  }

  @Roles([ERole.ADMIN])
  @Get()
  async getAmenties() {
    return new SuccessResponse(await this.amentyService.getAmenties()).setMessage('Danh sách tiện ích');
  }

  @Roles([ERole.ADMIN])
  @Get(':id')
  async getAmentyById(@Param('id') id: string) {
    return new SuccessResponse(await this.amentyService.getAmentyByIdOrThrow(id)).setMessage('Thông tin tiện ích');
  }

  @Roles([ERole.ADMIN])
  @Put(':id')
  async updateAmentyInfo(@Param('id') id: string, @Body() body: UpdateAmentyRequestDto) {
    return new SuccessResponse(await this.amentyService.updateAmentyInfo(id, body)).setMessage(
      'Cập nhật thông tin tiện ích thành công'
    );
  }

  @Roles([ERole.ADMIN])
  @Delete(':id')
  async deleteAmenty(@Param('id') id: string) {
    return new SuccessResponse(await this.amentyService.deleteAmenty(id)).setMessage('Xóa tiện ích thành công');
  }
}
