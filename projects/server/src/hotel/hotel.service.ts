import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from 'src/common/entities';
import { CreateHotelRequestDto, SearchHotelQueryDto, UpdateHotelRequestDto } from './hotel.dto';
import { Address } from 'src/common/types';
import { SearchHotelQueryBuilder } from './hotel.builder';
import { HotelType } from 'src/common/enum';

@Injectable()
export class HotelService {
  private searchHotelQueryBuilder: SearchHotelQueryBuilder;
  constructor(@InjectModel(Hotel.name) private readonly hotelModel: Model<HotelDocument>) {
    this.searchHotelQueryBuilder = new SearchHotelQueryBuilder();
  }

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
    this.searchHotelQueryBuilder.reset();
    this.searchHotelQueryBuilder.buildType(hotel.type.toString() as HotelType);
    this.searchHotelQueryBuilder.buildProvince(hotel.location.province.code);
    this.searchHotelQueryBuilder.buildAmenity(hotel.amenities.map((amenity) => amenity._id.toString()));

    return this.hotelModel.find(
      {
        _id: {
          $ne: hotelId
        },
        $or: this.searchHotelQueryBuilder.getQuery()
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

  async searchHotels(query: SearchHotelQueryDto) {
    const sort = query.sort ? query.sort.split('_') : undefined;
    const sortVal = {
      asc: 1,
      desc: -1
    };

    this.searchHotelQueryBuilder.reset();
    this.searchHotelQueryBuilder.buildKeyword(query.keyword);
    this.searchHotelQueryBuilder.buildDistrict(query.district);
    this.searchHotelQueryBuilder.buildProvince(query.province);
    this.searchHotelQueryBuilder.buildWard(query.ward);
    this.searchHotelQueryBuilder.buildTypes(query.type);
    this.searchHotelQueryBuilder.buildAmenity(query.amenity);
    this.searchHotelQueryBuilder.buildStar(query.star);
    this.searchHotelQueryBuilder.buildPrice(query.price);

    return this.hotelModel.find(
      {
        $and: this.searchHotelQueryBuilder.getQuery()
      },
      undefined,
      {
        populate: {
          path: 'amenities',
          select: 'name'
        },
        sort: sort ? { [sort[0]]: sortVal[sort[1]] } : undefined
      }
    );
  }
}
