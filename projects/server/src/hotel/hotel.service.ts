import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from 'src/common/entities';
import { CreateHotelRequestDto, UpdateHotelRequestDto } from './hotel.dto';

@Injectable()
export class HotelService {
  constructor(@InjectModel(Hotel.name) private readonly hotelModel: Model<HotelDocument>) {}

  async createHotel(hotel: CreateHotelRequestDto) {
    return await this.hotelModel.create(hotel);
  }

  async getHotels() {
    return this.hotelModel.find({}, undefined, {
      populate: {
        path: 'amenties',
        select: 'name'
      }
    });
  }

  async getHotelById(id: string) {
    return await this.hotelModel.findById(id);
  }

  async getHotelsByAmetyId(amentyId: string) {
    const hotels = await this.hotelModel.find({
      amenties: {
        $in: [amentyId]
      }
    });
    return hotels;
  }

  async pullAmentyInHotelHavingAmentyId(amentyId: string) {
    const hotels = await this.hotelModel.updateMany(
      {
        amenties: {
          $in: [amentyId]
        }
      },
      {
        $pull: {
          amenties: amentyId
        }
      },
      {
        new: true
      }
    );
    return hotels;
  }

  async getHotelByIdOrThrow(id: string) {
    const hotel = await this.getHotelById(id);
    if (!hotel) {
      throw new NotFoundException('Không tìm thấy khách sạn');
    }
    return hotel;
  }

  async updateHotelInfo(id: string, body: UpdateHotelRequestDto) {
    const hotel = await this.hotelModel.findByIdAndUpdate(
      id,
      {
        $set: body
      },
      { new: true }
    );

    if (!hotel) {
      throw new NotFoundException('Không tìm thấy khách sạn');
    }

    return hotel;
  }

  async deleteHotel(id: string) {
    const hotel = await this.hotelModel.findByIdAndDelete(id);
    if (!hotel) {
      throw new NotFoundException('Không tìm thấy khách sạn');
    }
    return hotel;
  }
}
