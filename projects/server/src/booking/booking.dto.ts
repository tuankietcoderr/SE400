import { PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { EBookingStatus, EPaymentMethod, EPaymentStatus } from 'src/common/enum';

export class CreateBookingRequestDto {
  hotel_id: string;
  room_ids: string[];
  user_id: string;
  check_in_date: Date;
  check_out_date: Date;
  total_price: number;
  @IsEnum(EPaymentMethod, {
    message: `Phương thức thanh toán không hợp lệ. Phải là một trong các giá trị sau: ${Object.values(EPaymentMethod).join(', ')}`
  })
  payment_method: EPaymentMethod;
}
export class UpdateBookingRequestDto extends PartialType(CreateBookingRequestDto) {}
