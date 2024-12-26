'use client';
import {EPaymentStatus} from '@/lib/enums/EPayment';
import {useUpdatePaymentStatusMutation} from '@/services/payment';
import {formatCurrency} from '@/utils/formatter';
import {Select, SelectItem} from '@nextui-org/react';
import {format} from 'date-fns';
import {toast} from 'sonner';

type TransactionDetailProps = {
  transaction: any;
};
const TransactionDetail = ({transaction}: TransactionDetailProps) => {
  const user = transaction.user_id;
  const booking = transaction.booking_id;

  const updatePaymentStatusMutation = useUpdatePaymentStatusMutation(
    transaction._id,
  );

  const handleUpdatePaymentStatus = async (e: any) => {
    const paymentStatus = e.target.value;
    updatePaymentStatusMutation.mutate(paymentStatus, {
      onSuccess: data => {
        if (data.success) {
          toast.success('Cập nhật trạng thái thanh toán thành công');
          return;
        }
        toast.error(data.message);
      },
      onError: err => {
        toast.error(err.message);
      },
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Thông tin giao dịch</h2>
      <h1 className="text-3xl font-semibold">
        # {transaction.transaction_id}/{booking.booking_id}
      </h1>
      <p className="italic">
        <span className="font-semibold">Người đặt:</span> {user.name} (
        {user.email}, {user.phone_number})
      </p>
      <div className="flex justify-between gap-4 italic">
        <div className="flex-1">
          <p>
            <span className="font-semibold">Ngày thanh toán:</span>{' '}
            {transaction.payment_date
              ? format(transaction.payment_date, 'dd/MM/yyyy')
              : '-'}
          </p>
          <p>
            <span className="font-semibold">Tổng tiền:</span>{' '}
            {formatCurrency(transaction.total_price)}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <p className="w-max font-semibold">Trạng thái thanh toán:</p>
            <Select
              size="sm"
              className="w-40"
              selectedKeys={[transaction.status]}
              selectionMode="single"
              onChange={handleUpdatePaymentStatus}>
              {Object.values(EPaymentStatus).map(status => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <p>
            <span className="font-semibold">Ngày tạo:</span>{' '}
            {format(transaction.createdAt, 'dd/MM/yyyy HH:mm')}
          </p>
          <p>
            <span className="font-semibold">Lần cập nhật cuối:</span>{' '}
            {format(transaction.updatedAt, 'dd/MM/yyyy HH:mm')}
          </p>
        </div>
      </div>
      {transaction.refund_details && (
        <div>
          <h3 className="text-xl font-semibold">Lí do hoàn trả</h3>
          <p>{transaction.refund_details.refund_reason || '-'}</p>
        </div>
      )}
    </div>
  );
};

export default TransactionDetail;
