import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Amenty, AmentyDocument } from 'src/common/entities';
import { CreateAmentyRequestDto, UpdateAmentyRequestDto } from './amenty.dto';
import { HotelService } from 'src/hotel/hotel.service';

@Injectable()
export class AmentyService {
  constructor(
    @InjectModel(Amenty.name) private readonly amentyModel: Model<AmentyDocument>,
    private readonly hotelService: HotelService
  ) {}

  async createAmenty(amenty: CreateAmentyRequestDto) {
    return await this.amentyModel.create(amenty);
  }

  async getAmenties() {
    return await this.amentyModel.find();
  }

  async getAmentyById(id: string) {
    return await this.amentyModel.findById(id);
  }

  async getAmentyByIdOrThrow(id: string) {
    const amenty = await this.getAmentyById(id);
    if (!amenty) {
      throw new NotFoundException('Tiện ích không tồn tại');
    }
    return amenty;
  }

  async updateAmentyInfo(id: string, body: UpdateAmentyRequestDto) {
    const amenty = await this.amentyModel.findByIdAndUpdate(
      id,
      {
        $set: body
      },
      { new: true }
    );
    if (!amenty) {
      throw new NotFoundException('Tiện ích không tồn tại');
    }
    return amenty;
  }

  async deleteAmenty(id: string) {
    const amenty = await this.getAmentyByIdOrThrow(id);
    await this.hotelService.pullAmentyInHotelHavingAmentyId(id);
    await amenty.deleteOne();
    return amenty;
  }
}
