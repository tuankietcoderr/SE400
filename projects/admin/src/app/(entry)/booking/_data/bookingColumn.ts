import {ColumnType} from '@/components/CustomTable';

export type BookingColumnKey =
  | 'actions'
  | 'booking_id'
  | 'check_in_date'
  | 'check_out_date'
  | 'total_price'
  | 'status'
  | 'hotel_id'
  | 'room_ids'
  | 'user_id'
  | 'payment_status'
  | 'transaction_id'
  | 'updatedAt';
export const bookingColumns: ColumnType<BookingColumnKey>[] = [
  {
    label: 'Mã đơn đặt phòng',
    key: 'booking_id',
    allowSorting: true,
  },
  {
    label: 'Ngày nhận phòng',
    key: 'check_in_date',
    allowSorting: true,
  },
  {
    label: 'Ngày trả phòng',
    key: 'check_out_date',
    allowSorting: true,
  },
  {
    label: 'Tổng tiền',
    key: 'total_price',
    allowSorting: true,
  },
  {
    label: 'Khách sạn',
    key: 'hotel_id',
    allowSorting: true,
  },
  {
    label: 'Phòng đặt',
    key: 'room_ids',
    allowSorting: true,
  },
  {
    label: 'Người đặt',
    key: 'user_id',
    allowSorting: true,
  },
  {
    label: 'Trạng thái đặt phòng',
    key: 'status',
    allowSorting: true,
  },
  {
    label: 'Trạng thái thanh toán',
    key: 'payment_status',
    allowSorting: true,
  },
  {
    label: 'Mã giao dịch',
    key: 'transaction_id',
    allowSorting: true,
  },
  {
    label: 'Cập nhật lần cuối',
    key: 'updatedAt',
    allowSorting: true,
  },
  {
    label: 'Hành động',
    key: 'actions',
  },
];
