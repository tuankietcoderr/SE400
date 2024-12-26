'use client';
import {useDeleteHotelMutation} from '@/services/hotel';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import {format} from 'date-fns';
import {SquarePen, Trash2} from 'lucide-react';
import Link from 'next/link';
import {Key, useState} from 'react';
import {toast} from 'sonner';
import {AmenityColumnKey} from '../_data/amenityColumn';

type Props = {
  hotel: any;
  columnKey: Key;
};

const RenderCellAmenity = ({hotel, columnKey}: Props) => {
  const cellValue = hotel[columnKey as any];
  const [showPopover, setShowPopover] = useState(false);
  const deleteHotelMutation = useDeleteHotelMutation();

  const onDelete = () => {
    deleteHotelMutation.mutate(hotel._id, {
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

  switch (columnKey as AmenityColumnKey) {
    case 'name':
      return <p className="line-clamp-1">{hotel.name}</p>;
    case 'updatedAt':
      return format(new Date(hotel.updatedAt || ''), 'dd/MM/yyyy HH:mm');
    case 'actions':
      return (
        <div className="flex items-center gap-1">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            color="primary"
            as={Link}
            href={`/amenity/${hotel._id}/edit`}>
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
                  Bạn có chắc chắn muốn xóa tiện ích <b>{hotel.name}</b> không?
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
      return <>{cellValue || '-'}</>;
  }
};

export default RenderCellAmenity;
