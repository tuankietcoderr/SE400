'use client';
import CustomTable from '@/components/CustomTable';
import {useGetAllAmenitiesQuery} from '@/services/amenity';
import {Spinner} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {useCallback, useMemo, useState} from 'react';
import {AmenityColumnKey, amenityColumns} from '../_data/amenityColumn';
import RenderCellAmenity from './RenderCellAmenity';

const AmenityListData = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const {isLoading, data} = useGetAllAmenitiesQuery();
  const hotels = data?.data || [];
  const realData = useMemo(
    () => (data?.data || []).slice((page - 1) * 10, page * 10),
    [data, page],
  );

  const fetchNext = useCallback((p: number) => {
    setPage(p);
  }, []);

  const onClickCreate = () => {
    router.push('/amenity/new');
  };

  return isLoading ? (
    <Spinner className="flex justify-center" />
  ) : (
    <div>
      <CustomTable
        dataSource={realData}
        columns={amenityColumns}
        RenderCell={(hotel: any, columnKey: any) => (
          <RenderCellAmenity hotel={hotel} columnKey={columnKey} />
        )}
        searchKeys={['name'] as AmenityColumnKey[]}
        searchPlaceholder="Tìm kiếm tiện ích"
        bodyProps={{
          emptyContent: 'Không có tiện ích nào',
          isLoading,
          loadingContent: <Spinner />,
        }}
        onClickCreate={onClickCreate}
        createText="Tạo tiện ích"
        pagination={{
          page,
          total: Math.ceil(hotels.length / 10),
          onChangePage: fetchNext,
        }}
      />
    </div>
  );
};

export default AmenityListData;
