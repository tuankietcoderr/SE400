import {ColumnType} from '@/components/CustomTable';

export type AmenityColumnKey = 'actions' | 'name' | 'description' | 'updatedAt';
export const amenityColumns: ColumnType<AmenityColumnKey>[] = [
  {
    label: 'Tên tiện ích',
    key: 'name',
    allowSorting: true,
  },
  {
    label: 'Mô tả',
    key: 'description',
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
