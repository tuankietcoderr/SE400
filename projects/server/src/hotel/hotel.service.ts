import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from 'src/common/entities';
import { CreateHotelRequestDto, SearchHotelQueryDto, UpdateHotelRequestDto } from './hotel.dto';
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
        $or: [{type: hotel.type}, {
          'location.province.code': hotel.location.province.code
        }, {
          amenities: {
            $in: hotel.amenities
          }
        }]
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
    const price = query.price ? query.price.split('-') : undefined;
    const sort = query.sort ? query.sort.split('_') : undefined;
    const sortVal = {
      asc: 1,
      desc: -1
    };
    console.log(':QUERY', [
      ...(query.keyword
        ? [
            {
              name: {
                $regex: query.keyword,
                $options: 'i'
              }
            }
          ]
        : []),
      ...(query.district
        ? [
            {
              'location.district.code': query.district
            }
          ]
        : []),
      ...(query.province
        ? [
            {
              'location.province.code': query.province
            }
          ]
        : []),
      ...(query.ward
        ? [
            {
              'location.ward.code': query.ward
            }
          ]
        : []),
      ...(query.type && query.type.length > 0
        ? [
            {
              type: {
                $in: query.type
              }
            }
          ]
        : []),
      ...(query.star
        ? [
            {
              rating: {
                $in: query.star
              }
            }
          ]
        : []),
      ...(query.amenity && query.amenity.length > 0
        ? [
            {
              amenities: {
                $in: query.amenity
              }
            }
          ]
        : []),
      ...(price
        ? [
            {
              price: {
                $gte: price ? Number(price[0]) : 0,
                $lte: price ? Number(price[1]) || 100000000 : 100000000
              }
            }
          ]
        : [])
    ]);
    return this.hotelModel.find(
      {
        $and: [
          ...(query.keyword
            ? [
                {
                  name: {
                    $regex: query.keyword,
                    $options: 'i'
                  }
                }
              ]
            : []),
          ...(query.district
            ? [
                {
                  'location.district.code': query.district
                }
              ]
            : []),
          ...(query.province
            ? [
                {
                  'location.province.code': query.province
                }
              ]
            : []),
          ...(query.ward
            ? [
                {
                  'location.ward.code': query.ward
                }
              ]
            : []),
          ...(query.type && query.type.length > 0
            ? [
                {
                  type: {
                    $in: query.type
                  }
                }
              ]
            : []),
          ...(query.star
            ? [
                {
                  rating: {
                    $in: query.star
                  }
                }
              ]
            : []),
          ...(query.amenity && query.amenity.length > 0
            ? [
                {
                  amenities: {
                    $in: query.amenity
                  }
                }
              ]
            : []),
          ...(price
            ? [
                {
                  price: {
                    $gte: price ? Number(price[0]) : 0,
                    $lte: price ? Number(price[1]) || 100000000 : 100000000
                  }
                }
              ]
            : [])
        ]
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
