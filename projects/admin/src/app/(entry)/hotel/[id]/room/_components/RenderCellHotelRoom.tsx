'use client';
import {useDeleteRoomMutation} from '@/services/room';
import {formatCurrency} from '@/utils/formatter';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import {format} from 'date-fns';
import {SquarePen, Trash2} from 'lucide-react';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {Key, useState} from 'react';
import {toast} from 'sonner';
import {HotelRoomColumnKey} from '../_data/hotelRoomColumn';

type Props = {
  room: any;
  columnKey: Key;
};

const RenderCellHotelRoom = ({room, columnKey}: Props) => {
  const cellValue = room[columnKey as any];
  const [showPopover, setShowPopover] = useState(false);
  const deleteHotelMutation = useDeleteRoomMutation();
  const {id: hotel_id} = useParams();

  const onDelete = () => {
    deleteHotelMutation.mutate(room._id, {
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

  switch (columnKey as HotelRoomColumnKey) {
    case 'name':
      return <p className="line-clamp-1">{room.name}</p>;
    case 'price':
      return formatCurrency(room.price);
    case 'type':
      return room.type;
    case 'updatedAt':
      return format(new Date(room.updatedAt || ''), 'dd/MM/yyyy HH:mm');
    case 'actions':
      return (
        <div className="flex items-center gap-1">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            color="primary"
            as={Link}
            href={`/hotel/${hotel_id}/room/${room._id}/edit`}>
            <SquarePen size={20} />
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
                <p>
                  Bạn có chắc chắn muốn xóa khách sạn <b>{room.name}</b> không?
                </p>
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
      return <>{cellValue}</>;
  }
};

export default RenderCellHotelRoom;
