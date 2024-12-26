'use client';
import RatingStar from '@/components/RatingStar';
import {useDeleteReviewMutation} from '@/services/review';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import {toast} from 'sonner';

type ReviewDetailModalProps = {
  review: any;
  visible: boolean;
  onClose: () => void;
};

const ReviewDetailModal = ({
  review,
  onClose: _onClose,
  visible,
}: ReviewDetailModalProps) => {
  const {isOpen, onOpenChange} = useDisclosure({
    onClose: _onClose,
    isOpen: visible,
  });

  const hotel = review.hotel_id;
  const user = review.user_id;
  const room = review.room_id;

  const deleteReviewMutation = useDeleteReviewMutation();

  const onDelete = () => {
    deleteReviewMutation.mutate(review._id, {
      onSuccess: data => {
        if (data.success) {
          _onClose();
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

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      size="lg">
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Chi tiết đánh giá
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl">
                  Khách sạn <b>{hotel?.name || '-'}</b>
                </h2>
                {room && (
                  <h3 className="text-xl">
                    Phòng <b>{room?.name || '-'}</b>
                  </h3>
                )}
                <div className="flex flex-col gap-2 rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">{user?.name}</p>
                    <RatingStar
                      rating={review.rating}
                      starProps={{
                        size: 14,
                      }}
                    />
                  </div>
                  <p>{review.comment}</p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Đóng
              </Button>
              <Button
                color="danger"
                onPress={onDelete}
                isDisabled={deleteReviewMutation.isPending}>
                {deleteReviewMutation.isPending ? 'Đang xử lý...' : 'Xóa'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ReviewDetailModal;
