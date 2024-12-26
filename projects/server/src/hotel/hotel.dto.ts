import { IsArray, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
import { HotelType } from 'src/common/enum';
import { Location } from 'src/common/types';

export class CreateHotelRequestDto {
  @IsString({
    message: 'Tên khách sạn phải là chuỗi'
  })
  @IsNotEmpty({
    message: 'Tên khách sạn không được để trống'
  })
  @MinLength(3, {
    message: 'Tên khách sạn phải có ít nhất 3 ký tự'
  })
  name: string;
  @IsEnum(HotelType, {
    message: 'Loại khách sạn không hợp lệ'
  })
  type: HotelType;
  @IsObject({
    message: 'Địa điểm không hợp lệ'
  })
  location: Location;
  @IsArray({
    message: 'Tiện ích phải là mảng'
  })
  amenities: string[];
  @IsString({
    message: 'Mô tả phải là chuỗi'
  })
  @MinLength(10, {
    message: 'Mô tả phải có ít nhất 10 ký tự'
  })
  description: string;
  @IsUrl(
    {},
    {
      message: 'Link ảnh không hợp lệ'
    }
  )
  thumbnail: string;
  @IsArray()
  @IsOptional()
  rooms: string[];
  @IsArray()
  @IsOptional()
  promotions: string[];
}

export class UpdateHotelRequestDto {
  @IsString({
    message: 'Tên khách sạn phải là chuỗi'
  })
  @IsOptional()
  name: string;
  @IsEnum(HotelType, {
    message: 'Loại khách sạn không hợp lệ'
  })
  @IsOptional()
  type: HotelType;
  @IsObject({
    message: 'Địa điểm không hợp lệ'
  })
  @IsOptional()
  location: Location;
  @IsArray({
    message: 'Tiện ích phải là mảng'
  })
  @IsOptional()
  amenities: string[];
  @IsString({
    message: 'Mô tả phải là chuỗi'
  })
  @MinLength(10, {
    message: 'Mô tả phải có ít nhất 10 ký tự'
  })
  @IsOptional()
  description: string;
  @IsUrl(
    {},
    {
      message: 'Link ảnh không hợp lệ'
    }
  )
  @IsOptional()
  thumbnail: string;

  @IsArray()
  @IsOptional()
  rooms: string[];

  @IsArray()
  @IsOptional()
  promotions: string[];
}
