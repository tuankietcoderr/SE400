import { IsEnum, IsString, Min, MinLength } from 'class-validator';
import { ERoomType } from 'src/common/enum';
import { RoomAvailability } from 'src/common/types/room.type';
import { PartialType } from '@nestjs/mapped-types';

export class CreateRoomRequestDto {
  @MinLength(3, { message: 'Tên phải tối thiểu 3 ký tự' })
  name: string;
  @IsEnum(ERoomType, { message: 'Loại phòng không hợp lệ' })
  type: ERoomType;
  @Min(1, { message: 'Sức chứa phải lớn hơn 0' })
  capacity: number;
  @Min(1, { message: 'Giá phải lớn hơn 0' })
  price: number;
  @MinLength(3, { message: 'Mô tả phải tối thiểu 3 ký tự' })
  description: string;
  images: string[];
  avaiability: RoomAvailability[];
  @MinLength(1, { message: 'ID khách sạn không được để trống' })
  hotel_id: string;
}

export class UpdateRoomRequestDto extends PartialType(CreateRoomRequestDto) {}
