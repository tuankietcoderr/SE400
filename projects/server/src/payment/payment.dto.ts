import { EPaymentMethod, EPaymentStatus } from 'src/common/enum';

export class CreatePaymentRequestDto {
  booking_id: string;
  user_id: string;
  total_price: number;
  payment_method: EPaymentMethod;
  payment_date: Date | null;
}
