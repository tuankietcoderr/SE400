'use client';
import {EBookingStatus} from '@/lib/enums/EBooking';
import {EPaymentStatus} from '@/lib/enums/EPayment';
import {useUpdateBookingMutation} from '@/services/booking';
import {useUpdatePaymentStatusMutation} from '@/services/payment';
import {formatCurrency} from '@/utils/formatter';
import {
  Button,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import {format} from 'date-fns';
import {Eye} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {toast} from 'sonner';

type BookingDetailProps = {
  booking: any;
};
const BookingDetail = ({booking}: BookingDetailProps) => {
  const hotel = booking.hotel_id;
  const location = hotel.location;
  const amenities = hotel.amenities;
  const rooms = booking.room_ids;
  const user = booking.user_id;
  const payment = booking.payment_id;

  const updateBookingMutation = useUpdateBookingMutation(booking._id);
  const updatePaymentStatusMutation = useUpdatePaymentStatusMutation(
    payment?._id,
  );

  const handleUpdateBookingStatus = async (e: any) => {
    const {value} = e.target;
    updateBookingMutation.mutate(
      {
        status: value,
      },
      {
        onSuccess: data => {
          if (data.success) {
            toast.success('Cập nhật trạng thái đặt phòng thành công');
            return;
          }
          toast.error(data.message);
        },
        onError: err => {
          toast.error(err.message);
        },
      },
    );
  };

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
      <h2 className="text-xl font-semibold">Thông tin đặt phòng</h2>
      <h1 className="text-3xl font-semibold"># {booking.booking_id}</h1>
      <p className="italic">
        Người đặt: {user.name} ({user.email}, {user.phone_number})
      </p>
      <div className="flex justify-between gap-4 italic">
        <div className="flex-1">
          <p>
            <span className="font-semibold">Ngày nhận phòng:</span>{' '}
            {format(booking.check_in_date, 'dd/MM/yyyy')}
          </p>
          <p>
            <span className="font-semibold">Ngày trả phòng:</span>{' '}
            {format(booking.check_out_date, 'dd/MM/yyyy')}
          </p>
          <p>
            <span className="font-semibold">Tổng tiền:</span>{' '}
            {formatCurrency(booking.total_price)}
          </p>
          <div className="flex items-center gap-2">
            <p className="w-max font-semibold">Trạng thái đặt phòng:</p>
            <Select
              size="sm"
              className="w-40"
              selectedKeys={[booking.status]}
              selectionMode="single"
              onChange={handleUpdateBookingStatus}>
              {Object.values(EBookingStatus).map(status => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </Select>
          </div>
          {payment && (
            <div className="mt-1 flex items-center gap-2">
              <p className="w-max font-semibold">Trạng thái thanh toán:</p>
              <Select
                size="sm"
                className="w-40"
                selectedKeys={[payment.status]}
                selectionMode="single"
                onChange={handleUpdatePaymentStatus}>
                {Object.values(EPaymentStatus).map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}
        </div>
        <div>
          <p>
            <span className="font-semibold">Ngày tạo:</span>{' '}
            {format(booking.createdAt, 'dd/MM/yyyy HH:mm')}
          </p>
          <p>
            <span className="font-semibold">Lần cập nhật cuối:</span>{' '}
            {format(booking.updatedAt, 'dd/MM/yyyy HH:mm')}
          </p>
        </div>
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Khách sạn</h2>
          <p>
            <span className="font-semibold">Tên:</span> {hotel.name}
          </p>
          <p>
            <span className="font-semibold">Địa chỉ:</span>{' '}
            {[
              location.address,
              location.ward.name,
              location.district.name,
              location.province.name,
            ].join(', ')}
          </p>
          <p>
            <span className="font-semibold">Tiện ích:</span>{' '}
            {amenities.map((amenity: any) => amenity.name).join(', ')}
          </p>
        </div>
        <div>
          <Image
            src={hotel.thumbnail}
            alt={hotel.name}
            width={400}
            height={200}
            className="aspect-video object-cover"
          />
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-semibold">Danh sách phòng</h2>
        <Table isStriped>
          <TableHeader>
            <TableColumn>STT</TableColumn>
            <TableColumn>Tên</TableColumn>
            <TableColumn>Loại</TableColumn>
            <TableColumn>Giá</TableColumn>
            <TableColumn>Sức chứa</TableColumn>
            <TableColumn>Xem</TableColumn>
          </TableHeader>
          <TableBody>
            {rooms.map((room: any, index: number) => (
              <TableRow key={room._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.type}</TableCell>
                <TableCell>{formatCurrency(room.price)}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    color="primary"
                    as={Link}
                    href={`/hotel/${hotel._id}/room/${room._id}/edit`}>
                    <Eye size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BookingDetail;
