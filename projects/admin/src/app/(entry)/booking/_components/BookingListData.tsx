'use client';
import CustomTable from '@/components/CustomTable';
import {useGetAllBookingQuery} from '@/services/booking';
import {Spinner} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {useCallback, useMemo, useState} from 'react';
import {BookingColumnKey, bookingColumns} from '../_data/bookingColumn';
import RenderCellBooking from './RenderCellBooking';

const BookingListData = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const {isLoading, data} = useGetAllBookingQuery();
  const hotels = data?.data || [];
  const realData = useMemo(
    () => (data?.data || []).slice((page - 1) * 10, page * 10),
    [data, page],
  );

  const fetchNext = useCallback((p: number) => {
    setPage(p);
  }, []);

  return isLoading ? (
    <Spinner className="flex justify-center" />
  ) : (
    <div>
      <CustomTable
        dataSource={realData}
        columns={bookingColumns}
        RenderCell={(hotel: any, columnKey: any) => (
          <RenderCellBooking booking={hotel} columnKey={columnKey} />
        )}
        searchKeys={['booking_id'] as BookingColumnKey[]}
        searchPlaceholder="Tìm kiếm đơn đặt phòng"
        bodyProps={{
          emptyContent: 'Không có đơn đặt phòng nào',
          isLoading,
          loadingContent: <Spinner />,
        }}
        showCreate={false}
        pagination={{
          page,
          total: Math.ceil(hotels.length / 10),
          onChangePage: fetchNext,
        }}
      />
    </div>
  );
};

export default BookingListData;
