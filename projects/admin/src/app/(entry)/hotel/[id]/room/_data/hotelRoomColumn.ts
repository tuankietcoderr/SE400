import {ColumnType} from '@/components/CustomTable';

export type HotelRoomColumnKey =
  | 'actions'
  | 'name'
  | 'type'
  | 'price'
  | 'capacity'
  | 'updatedAt';
export const hotelRoomColumns: ColumnType<HotelRoomColumnKey>[] = [
  {
    label: 'Tên phòng',
    key: 'name',
    allowSorting: true,
  },
  {
    label: 'Loại',
    key: 'type',
    allowSorting: true,
  },
  {
    label: 'Giá',
    key: 'price',
    allowSorting: true,
  },
  {
    label: 'Sức chứa',
    key: 'capacity',
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
