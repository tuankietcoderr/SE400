import {ColumnType} from '@/components/CustomTable';

export type HotelColumnKey =
  | 'actions'
  | 'name'
  | 'type'
  | 'address'
  | 'rooms'
  | 'price'
  | 'amenities'
  | 'updatedAt';
export const hotelColumns: ColumnType<HotelColumnKey>[] = [
  {
    label: 'Tên khách sạn',
    key: 'name',
    allowSorting: true,
  },
  {
    label: 'Loại',
    key: 'type',
    allowSorting: true,
  },
  {
    label: 'Địa chỉ',
    key: 'address',
  },
  {
    label: 'Tiện ích',
    key: 'amenities',
  },
  {
    label: 'Giá',
    key: 'price',
    allowSorting: true,
  },
  {
    label: 'Số phòng',
    key: 'rooms',
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
