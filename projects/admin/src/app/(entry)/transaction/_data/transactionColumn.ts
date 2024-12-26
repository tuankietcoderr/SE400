import {ColumnType} from '@/components/CustomTable';

export type TransactionColumnKey =
  | 'actions'
  | 'booking_id'
  | 'payment_date'
  | 'payment_method'
  | 'user_id'
  | 'total_price'
  | 'status'
  | 'transaction_id'
  | 'updatedAt';
export const transactionColumns: ColumnType<TransactionColumnKey>[] = [
  {
    label: 'Mã giao dịch',
    key: 'transaction_id',
    allowSorting: true,
  },
  {
    label: 'Mã đơn đặt phòng',
    key: 'booking_id',
    allowSorting: true,
  },
  {
    label: 'Người đặt',
    key: 'user_id',
    allowSorting: true,
  },
  {
    label: 'Ngày thanh toán',
    key: 'payment_date',
    allowSorting: true,
  },
  {
    label: 'Phương thức thanh toán',
    key: 'payment_method',
    allowSorting: true,
  },
  {
    label: 'Tổng tiền',
    key: 'total_price',
    allowSorting: true,
  },
  {
    label: 'Trạng thái',
    key: 'status',
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
