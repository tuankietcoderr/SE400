import { Injectable } from '@nestjs/common';
import { HotelType } from 'src/common/enum';

interface SearchHotelBuilder {
  reset(): void;
  buildKeyword(keyword?: string): void;
  buildDistrict(district?: string): void;
  buildProvince(province?: string): void;
  buildWard(ward?: string): void;
  buildType(type?: HotelType): void;
  buildTypes(type?: HotelType[]): void;
  buildAmenity(amenity?: string[]): void;
  buildStar(star?: number[]): void;
  buildPrice(price?: string): void;
}

@Injectable()
export class SearchHotelQueryBuilder implements SearchHotelBuilder {
  private query: any[] = [];
  reset(): void {
    this.query = [];
  }
  buildKeyword(keyword?: string): void {
    if (keyword) {
      this.query.push({
        name: {
          $regex: keyword,
          $options: 'i'
        }
      });
    }
  }
  buildDistrict(district?: string): void {
    if (district) {
      this.query.push({
        'location.district.code': district
      });
    }
  }
  buildProvince(province?: string): void {
    if (province) {
      this.query.push({
        'location.province.code': province
      });
    }
  }
  buildWard(ward?: string): void {
    if (ward) {
      this.query.push({
        'location.ward.code': ward
      });
    }
  }

  buildType(type?: HotelType): void {
    if (type) {
      this.query.push({
        type
      });
    }
  }

  buildTypes(type?: HotelType[]): void {
    if (type && type.length > 0) {
      this.query.push({
        type: {
          $in: type
        }
      });
    }
  }
  buildAmenity(amenity?: string[]): void {
    if (amenity && amenity.length > 0) {
      this.query.push({
        amenities: {
          $in: amenity
        }
      });
    }
  }
  buildStar(star?: number[]): void {
    if (star && star.length > 0) {
      this.query.push({
        rating: {
          $in: star
        }
      });
    }
  }
  buildPrice(price?: string): void {
    if (price) {
      const [min, max] = price.split('-');
      this.query.push({
        price: {
          $gte: price ? Number(min) : 0,
          $lte: price ? Number(max) || 100000000 : 100000000
        }
      });
    }
  }

  getQuery(): any[] {
    return this.query;
  }
}
