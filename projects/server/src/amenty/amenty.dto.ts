import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateAmentyRequestDto {
  @IsNotEmpty({
    message: 'Tên tiện ích không được để trống'
  })
  @MinLength(2, {
    message: 'Tên tiện ích phải có ít nhất 2 ký tự'
  })
  name: string;
  description: string;
}

export class UpdateAmentyRequestDto {
  @MinLength(2, {
    message: 'Tên tiện ích phải có ít nhất 2 ký tự'
  })
  @IsOptional()
  name: string;
  description: string;
}
