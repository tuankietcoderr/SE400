'use client';
import ScreenLoader from '@/components/ScreenLoader';
import {useDeleteHotelMutation} from '@/services/hotel';
import {useDeleteReviewMutation} from '@/services/review';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import {format} from 'date-fns';
import {Eye, Trash2} from 'lucide-react';
import dynamic from 'next/dynamic';
import {Key, useState} from 'react';
import {toast} from 'sonner';
import {ReviewColumnKey} from '../_data/reviewColumn';

const ReviewDetailModal = dynamic(() => import('./ReviewDetailModal'), {
  ssr: false,
  loading: () => <ScreenLoader />,
});

type Props = {
  review: any;
  columnKey: Key;
};

const RenderCellReview = ({review, columnKey}: Props) => {
  const cellValue = review[columnKey as any];
  const [showPopover, setShowPopover] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const deleteHotelMutation = useDeleteHotelMutation();

  const isLoading = deleteHotelMutation.isPending;
  const user = review.user_id;
  const hotel = review.hotel_id;
  const room = review.room_id;

  const deleteReviewMutation = useDeleteReviewMutation();

  const onDelete = () => {
    deleteReviewMutation.mutate(review._id, {
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

  switch (columnKey as ReviewColumnKey) {
    case 'user_id':
      return user?.name || '-';
    case 'hotel_id':
      return hotel?.name || '-';
    case 'room_id':
      return room?.name || '-';
    case 'comment':
      return <p className="line-clamp-3">{review.comment || '-'}</p>;
    case 'updatedAt':
      return (
        <p className="w-max">
          {format(new Date(review.updatedAt || ''), 'dd/MM/yyyy HH:mm')}
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
            onPress={() => setShowModal(true)}>
            <Eye size={20} />
          </Button>
          {showModal && (
            <ReviewDetailModal
              review={review}
              visible={showModal}
              onClose={() => setShowModal(false)}
            />
          )}
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
                <p>Bạn có chắc chắn muốn xóa đánh giá này không?</p>
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

export default RenderCellReview;
