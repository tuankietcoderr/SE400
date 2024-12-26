import {ColumnType} from '@/components/CustomTable';

export type ReviewColumnKey =
  | 'actions'
  | 'user_id'
  | 'hotel_id'
  | 'room_id'
  | 'rating'
  | 'comment'
  | 'updatedAt';
export const reviewColumns: ColumnType<ReviewColumnKey>[] = [
  {
    label: 'Người đánh giá',
    key: 'user_id',
    allowSorting: true,
  },
  {
    label: 'Khách sạn',
    key: 'hotel_id',
    allowSorting: true,
  },
  {
    label: 'Phòng',
    key: 'room_id',
    allowSorting: true,
  },
  {
    label: 'Nội dung',
    key: 'comment',
    allowSorting: true,
  },
  {
    label: 'Đánh giá',
    key: 'rating',
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
