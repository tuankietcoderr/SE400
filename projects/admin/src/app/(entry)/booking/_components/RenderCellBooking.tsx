'use client';
import {useDeleteBookingMutation} from '@/services/booking';
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
import {BookingColumnKey} from '../_data/bookingColumn';

type Props = {
  booking: any;
  columnKey: Key;
};

const RenderCellBooking = ({booking, columnKey}: Props) => {
  const cellValue = booking[columnKey as any];
  const [showPopover, setShowPopover] = useState(false);
  const deleteHotelMutation = useDeleteBookingMutation();

  const onDelete = () => {
    deleteHotelMutation.mutate(booking._id, {
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
  const hotel = booking.hotel_id;
  const rooms = booking.room_ids;
  const user = booking.user_id;
  const payment = booking.payment_id;

  switch (columnKey as BookingColumnKey) {
    case 'check_in_date':
      return format(new Date(booking.check_in_date || ''), 'dd/MM/yyyy');
    case 'check_out_date':
      return format(new Date(booking.check_out_date || ''), 'dd/MM/yyyy');
    case 'hotel_id':
      return hotel?.name || '-';
    case 'room_ids':
      return rooms?.map((room: any) => room.name).join(', ');
    case 'user_id':
      return user?.name || '-';
    case 'payment_status':
      return payment?.status || '-';
    case 'transaction_id':
      return <p className="w-max">{payment?.transaction_id || '-'}</p>;
    case 'updatedAt':
      return format(new Date(booking.updatedAt || ''), 'dd/MM/yyyy HH:mm');
    case 'actions':
      return (
        <div className="flex items-center gap-1">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            color="primary"
            as={Link}
            href={`/booking/${booking._id}`}>
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
                <p>Bạn có chắc chắn muốn xóa đơn đặt phòng không?</p>
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

export default RenderCellBooking;
