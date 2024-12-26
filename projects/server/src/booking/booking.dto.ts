import { PartialType } from '@nestjs/mapped-types';
import { EBookingStatus, EPaymentMethod } from 'src/common/enum';

export class CreateBookingRequestDto {
  hotel_id: string;
  room_ids: string[];
  user_id: string;
  check_in_date: Date;
  check_out_date: Date;
  total_price: number;
  payment_method: EPaymentMethod;
}
export class UpdateBookingRequestDto extends PartialType(CreateBookingRequestDto) {
  status?: EBookingStatus;
}
