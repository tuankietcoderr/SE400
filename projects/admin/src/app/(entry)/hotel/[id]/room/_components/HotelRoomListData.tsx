'use client';
import CustomTable from '@/components/CustomTable';
import {useGetHotelRoomsQuery} from '@/services/room';
import {Spinner} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {useCallback, useMemo, useState} from 'react';
import {HotelRoomColumnKey, hotelRoomColumns} from '../_data/hotelRoomColumn';
import RenderCellHotel from './RenderCellHotelRoom';

type HotelRoomListDataProps = {
  hotelId: string;
};
const HotelRoomListData = ({hotelId}: HotelRoomListDataProps) => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const {isLoading, data} = useGetHotelRoomsQuery(hotelId);
  const hotels = data?.data || [];
  const realData = useMemo(
    () => (data?.data || []).slice((page - 1) * 10, page * 10),
    [data, page],
  );

  const fetchNext = useCallback((query: any = {}) => {
    setPage(page => page + 1);
  }, []);

  const onClickCreate = () => {
    router.push(`/hotel/${hotelId}/room/new`);
  };

  return isLoading ? (
    <Spinner className="flex justify-center" />
  ) : (
    <div>
      <CustomTable
        dataSource={realData}
        columns={hotelRoomColumns}
        RenderCell={(hotel: any, columnKey: any) => (
          <RenderCellHotel room={hotel} columnKey={columnKey} />
        )}
        searchKeys={['name'] as HotelRoomColumnKey[]}
        searchPlaceholder="Tìm kiếm phòng khách sạn"
        bodyProps={{
          emptyContent: 'Không có phòng khách sạn nào',
          isLoading,
          loadingContent: <Spinner />,
        }}
        onClickCreate={onClickCreate}
        createText="Tạo phòng khách sạn"
        pagination={{
          page,
          total: hotels.length / 10,
          onChangePage: fetchNext,
        }}
      />
    </div>
  );
};

export default HotelRoomListData;
