import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from 'src/common/entities';
import { CreateHotelRequestDto, UpdateHotelRequestDto } from './hotel.dto';
import { Address } from 'src/common/types';

@Injectable()
export class HotelService {
  constructor(@InjectModel(Hotel.name) private readonly hotelModel: Model<HotelDocument>) {}

  async createHotel(hotel: CreateHotelRequestDto) {
    return await this.hotelModel.create(hotel);
  }

  async getHotels() {
    return this.hotelModel.find({}, undefined, {
      populate: {
        path: 'amenities',
        select: 'name'
      }
    });
  }

  async getRelativeHotels(hotelId: string) {
    const hotel = await this.getHotelByIdOrThrow(hotelId);

    return this.hotelModel.find(
      {
        _id: {
          $ne: hotelId
        },
        type: hotel.type
      },
      undefined,
      {
        populate: {
          path: 'amenities',
          select: 'name'
        }
      }
    );
  }

  async getHotelById(id: string) {
    return await this.hotelModel.findById(
      id,
      {},
      {
        populate: [
          {
            path: 'amenities',
            select: 'name'
          },
          {
            path: 'rooms'
          }
        ]
      }
    );
  }

  async getHotelsByAmetyId(amenityId: string) {
    const hotels = await this.hotelModel.find({
      amenities: {
        $in: [amenityId]
      }
    });
    return hotels;
  }

  async pullAmenityInHotelHavingAmenityId(amenityId: string) {
    const hotels = await this.hotelModel.updateMany(
      {
        amenities: {
          $in: [amenityId]
        }
      },
      {
        $pull: {
          amenities: amenityId
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

  async getTrendingHotels() {
    return this.hotelModel
      .find({
        rating: {
          $gte: 4
        }
      })
      .limit(5);
  }

  async searchHotels(address: Pick<Address, 'district' | 'province' | 'ward'>) {
    return this.hotelModel.find(
      {
        'location.district.code': address.district,
        'location.province.code': address.province,
        'location.ward.code': address.ward
      },
      undefined,
      {
        populate: {
          path: 'amenities',
          select: 'name'
        }
      }
    );
  }
}
