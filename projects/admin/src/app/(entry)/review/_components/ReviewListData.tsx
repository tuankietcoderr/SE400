'use client';
import CustomTable from '@/components/CustomTable';
import {useGetAllReviewsQuery} from '@/services/review';
import {Spinner} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {useCallback, useMemo, useState} from 'react';
import {ReviewColumnKey, reviewColumns} from '../_data/reviewColumn';
import RenderCellReview from './RenderCellReview';

const ReviewListData = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const {isLoading, data, isRefetching} = useGetAllReviewsQuery();
  const hotels = data?.data || [];
  const realData = useMemo(
    () => (data?.data || []).slice((page - 1) * 10, page * 10),
    [data, page],
  );

  const fetchNext = useCallback((query: any = {}) => {
    setPage(page => page + 1);
  }, []);

  return isLoading ? (
    <Spinner className="flex justify-center" />
  ) : (
    <div>
      <CustomTable
        dataSource={realData}
        columns={reviewColumns}
        RenderCell={(hotel: any, columnKey: any) => (
          <RenderCellReview review={hotel} columnKey={columnKey} />
        )}
        searchKeys={['comment'] as ReviewColumnKey[]}
        searchPlaceholder="Tìm kiếm đánh giá"
        bodyProps={{
          emptyContent: 'Không có đánh giá nào',
          isLoading: isLoading || isRefetching,
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

export default ReviewListData;
