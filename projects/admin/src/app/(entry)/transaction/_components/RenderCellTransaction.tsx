'use client';
import {useDeletePaymentMutation} from '@/services/payment';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import {format} from 'date-fns';
import {Eye, Trash2} from 'lucide-react';
import Link from 'next/link';
import {Key, useState} from 'react';
import {toast} from 'sonner';
import {TransactionColumnKey} from '../_data/transactionColumn';

type Props = {
  transaction: any;
  columnKey: Key;
};

const RenderCellTransaction = ({transaction, columnKey}: Props) => {
  const cellValue = transaction[columnKey as any];
  const [showPopover, setShowPopover] = useState(false);
  const deleteHotelMutation = useDeletePaymentMutation();

  const onDelete = () => {
    deleteHotelMutation.mutate(transaction._id, {
      onSuccess: data => {
        if (data.success) {
          setShowPopover(false);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      },
      onError: error => {
        toast.error(error.message);
      },
    });
  };

  const isLoading = deleteHotelMutation.isPending;
  const booking = transaction.booking_id;
  const user = transaction.user_id;

  switch (columnKey as TransactionColumnKey) {
    case 'booking_id':
      return <p className="w-max">{booking?.booking_id || '-'}</p>;
    case 'payment_date':
      return (
        <p className="w-max">
          {format(new Date(transaction.payment_date || ''), 'dd/MM/yyyy')}
        </p>
      );
    case 'user_id':
      return user?.name || '-';
    case 'updatedAt':
      return (
        <p className="w-max">
          {format(new Date(transaction.updatedAt || ''), 'dd/MM/yyyy HH:mm')}
        </p>
      );
    case 'actions':
      return (
        <div className="flex items-center gap-1">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            color="primary"
            as={Link}
            href={`/transaction/${transaction._id}`}>
            <Eye size={20} />
          </Button>
          <Popover
            placement="right"
            isOpen={showPopover}
            onOpenChange={setShowPopover}
            showArrow>
            <PopoverTrigger>
              <Button
                isIconOnly
                variant="light"
                color="danger"
                size="sm"
                onPress={() => console.log('delete')}>
                <Trash2 size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2 self-end px-1 py-2">
                <p className="font-bold">Xác nhận xóa</p>
                <p>Bạn có chắc chắn muốn xóa giao dịch không?</p>
                <div className="flex justify-end space-x-2">
                  <Button color="danger" onPress={onDelete} size="sm">
                    {isLoading ? 'Đang xóa...' : 'Xóa'}
                  </Button>
                  <Button
                    color="default"
                    onPress={() => setShowPopover(false)}
                    size="sm">
                    Hủy
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    default:
      return <p className="w-max">{cellValue || '-'}</p>;
  }
};

export default RenderCellTransaction;
