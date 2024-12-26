'use client';
import {useDeleteHotelMutation} from '@/services/hotel';
import {formatCurrency} from '@/utils/formatter';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import {format} from 'date-fns';
import {SquarePen, Trash2} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {Key, useState} from 'react';
import {toast} from 'sonner';
import {HotelColumnKey} from '../_data/hotelColumn';

type Props = {
  hotel: any;
  columnKey: Key;
};

const RenderCellHotel = ({hotel, columnKey}: Props) => {
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

  switch (columnKey as HotelColumnKey) {
    case 'name':
      return (
        <div className="flex w-max items-center gap-2">
          <Image
            src={hotel.thumbnail}
            alt={hotel.name}
            width={100}
            height={50}
            className="hidden aspect-video overflow-hidden bg-white object-cover md:block"
          />
          <div>
            <p className="line-clamp-1">{hotel.name}</p>
          </div>
        </div>
      );
    case 'address':
      return (
        <p className="w-max">
          {[
            hotel.location.address,
            hotel.location.ward.name,
            hotel.location.district.name,
            hotel.location.province.name,
          ].join(', ')}
        </p>
      );
    case 'price':
      return formatCurrency(hotel.price);
    case 'amenities':
      return (
        <p className="w-max">
          {hotel.amenities.map((amenity: any) => amenity.name).join(', ')}
        </p>
      );
    case 'type':
      return hotel.type;
    case 'rooms':
      return hotel.rooms.length;
    case 'updatedAt':
      return (
        <p className="w-max">
          {format(new Date(hotel.updatedAt || ''), 'dd/MM/yyyy HH:mm')}
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
            href={`/hotel/${hotel._id}/edit`}>
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
                  Bạn có chắc chắn muốn xóa khách sạn <b>{hotel.name}</b> không?
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
      return <p className="w-max">{cellValue}</p>;
  }
};

export default RenderCellHotel;
