'use client';
import CustomTable from '@/components/CustomTable';
import {useGetAllPaymentQuery} from '@/services/payment';
import {Spinner} from '@nextui-org/react';
import {useRouter} from 'next/navigation';
import {useCallback, useMemo, useState} from 'react';
import {
  TransactionColumnKey,
  transactionColumns,
} from '../_data/transactionColumn';
import RenderCellBooking from './RenderCellTransaction';

const TransactionListData = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const {isLoading, data} = useGetAllPaymentQuery();
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
        columns={transactionColumns}
        RenderCell={(hotel: any, columnKey: any) => (
          <RenderCellBooking transaction={hotel} columnKey={columnKey} />
        )}
        searchKeys={['transaction_id'] as TransactionColumnKey[]}
        searchPlaceholder="Tìm kiếm giao dịch"
        bodyProps={{
          emptyContent: 'Không có giao dịch nào',
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

export default TransactionListData;
