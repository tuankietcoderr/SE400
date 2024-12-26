import {
  ArrowLeftRight,
  Banknote,
  Bed,
  CalendarArrowDown,
  CalendarArrowUp,
  CircleDashed,
  Hotel,
  UserRound,
} from "lucide-solid";
import instance from "../utils/axios-config";
import { EBookingStatus } from "../lib/constants";
import toast from "solid-toast";
import("review_mf/reviewButton");

const BookingCard = ({ booking, refetch }) => {
  const cancelBooking = async () => {
    const res = await instance.put(`/booking/${booking._id}/cancel`);
    if (res.data.success) {
      toast.success("Hủy đặt phòng thành công!");
      refetch();
      return;
    }
    toast.error("Hủy đặt phòng thất bại! " + res.data.message);
  };

  const hotelId = booking.hotel_id._id;

  return (
    <div className="border p-4 shadow space-y-4">
      <h3 className="text-lg font-bold">#{booking.booking_id}</h3>
      <p className="text-sm text-gray-500">
        lúc {new Date(booking.createdAt).toLocaleString()}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`/${booking.hotel_id._id}`}
          className="flex items-center gap-4"
          target="_blank"
          rel="noreferrer"
        >
          <Hotel size={16} class="text-gray-500" />
          <p className="text-sm text-gray-500">{booking.hotel_id.name}</p>
        </a>
        <div className="flex items-center gap-4">
          <Bed size={16} class="text-gray-500" />
          <p className="text-sm text-gray-500">
            {booking.room_ids.map((r) => r.name).join(", ")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <CalendarArrowUp size={16} class="text-gray-500" />
          <p className="text-sm text-gray-500">
            {new Date(booking.check_in_date).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <CalendarArrowDown size={16} class="text-gray-500" />
          <p className="text-sm text-gray-500">
            {new Date(booking.check_in_date).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <CircleDashed size={16} class="text-gray-500" />
          <p className="text-sm text-gray-500">{booking.status}</p>
        </div>
        <div className="flex items-center gap-4">
          <UserRound size={16} class="text-gray-500" />
          <p className="text-sm text-gray-500">{booking.user_id.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <Banknote size={16} class="text-gray-500" />
          <p className="text-sm text-gray-500">{booking.payment_id.status}</p>
        </div>
        <div className="flex items-center gap-4">
          <ArrowLeftRight size={16} class="text-gray-500" />
          <p className="text-sm text-gray-500">
            {booking.payment_id.transaction_id}
          </p>
        </div>
      </div>
      {booking.status !== EBookingStatus.CANCELLED &&
        booking.status !== EBookingStatus.COMPLETED && (
          <div>
            <button
              className="border text-sm px-2 py-1 hover:bg-gray-200 bg-white transition-colors"
              onClick={cancelBooking}
            >
              Hủy đặt phòng
            </button>
          </div>
        )}
      {booking.status === EBookingStatus.COMPLETED && (
        <review-button attr:hotelId={hotelId} attr:bookingId={booking._id} />
      )}
    </div>
  );
};

export default BookingCard;
