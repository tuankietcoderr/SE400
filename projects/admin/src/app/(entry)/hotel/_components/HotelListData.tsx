'use client';
import CustomTable from '@/components/CustomTable';
import {useGetAllHotelsQuery} from '@/services/hotel';
import {Spinner} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {useCallback, useMemo, useState} from 'react';
import {HotelColumnKey, hotelColumns} from '../_data/hotelColumn';
import RenderCellHotel from './RenderCellHotel';

const HotelListData = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const {isLoading, data} = useGetAllHotelsQuery();
  const hotels = data?.data || [];
  const realData = useMemo(
    () => (data?.data || []).slice((page - 1) * 10, page * 10),
    [data, page],
  );

  const fetchNext = useCallback((query: any = {}) => {
    setPage(page => page + 1);
  }, []);

  const onClickCreate = () => {
    router.push('/hotel/new');
  };

  return isLoading ? (
    <Spinner className="flex justify-center" />
  ) : (
    <div>
      <CustomTable
        dataSource={realData}
        columns={hotelColumns}
        RenderCell={(hotel: any, columnKey: any) => (
          <RenderCellHotel hotel={hotel} columnKey={columnKey} />
        )}
        searchKeys={['name'] as HotelColumnKey[]}
        searchPlaceholder="Tìm kiếm khách sạn"
        bodyProps={{
          emptyContent: 'Không có khách sạn nào',
          isLoading,
          loadingContent: <Spinner />,
        }}
        onClickCreate={onClickCreate}
        createText="Tạo khách sạn"
        pagination={{
          page,
          total: hotels.length / 10,
          onChangePage: fetchNext,
        }}
      />
    </div>
  );
};

export default HotelListData;
