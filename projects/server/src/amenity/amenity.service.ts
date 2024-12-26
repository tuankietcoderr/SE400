import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Amenity, AmenityDocument } from 'src/common/entities';
import { CreateAmenityRequestDto, UpdateAmenityRequestDto } from './amenity.dto';
import { HotelService } from 'src/hotel/hotel.service';

@Injectable()
export class AmenityService {
  constructor(
    @InjectModel(Amenity.name) private readonly amenityModel: Model<AmenityDocument>,
    private readonly hotelService: HotelService
  ) {}

  async createAmenity(amenity: CreateAmenityRequestDto) {
    return await this.amenityModel.create(amenity);
  }

  async getAmenities() {
    return await this.amenityModel.find();
  }

  async getAmenityById(id: string) {
    return await this.amenityModel.findById(id);
  }

  async getAmenityByIdOrThrow(id: string) {
    const amenity = await this.getAmenityById(id);
    if (!amenity) {
      throw new NotFoundException('Tiện ích không tồn tại');
    }
    return amenity;
  }

  async updateAmenityInfo(id: string, body: UpdateAmenityRequestDto) {
    const amenity = await this.amenityModel.findByIdAndUpdate(
      id,
      {
        $set: body
      },
      { new: true }
    );
    if (!amenity) {
      throw new NotFoundException('Tiện ích không tồn tại');
    }
    return amenity;
  }

  async deleteAmenity(id: string) {
    const amenity = await this.getAmenityByIdOrThrow(id);
    await this.hotelService.pullAmenityInHotelHavingAmenityId(id);
    await amenity.deleteOne();
    return amenity;
  }
}
