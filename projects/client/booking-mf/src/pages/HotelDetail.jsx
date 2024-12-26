import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../utils/axios-config";
import { MapPinIcon, Star, Trash2, WifiIcon } from "lucide-react";
import { formatCurrency } from "../utils/formatter";
import { PaymentMethod } from "../lib/constant";
import useReviewList from "../components/ReviewList";
import useProcessPaymentButton from "../components/ProcessPaymentButton";
import RecommendHotels from "../components/RecommendHotels";

const HotelDetail = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.CASH);
  const [checkInDate, setCheckInDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [checkOutDate, setCheckOutDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    instance.get(`/hotel/${hotelId}`).then((res) => {
      setHotel(res.data.data);
    });
    useReviewList();
    useProcessPaymentButton();
  }, []);

  const handleAddRoom = (room) => {
    setBookedRooms((prev) => [...prev, room]);
  };

  const handleRemoveRoom = (roomId) => {
    setBookedRooms((prev) => prev.filter((room) => room._id !== roomId));
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const handleCheckInDate = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
  };

  const handleBooking = () => {};

  const address = hotel
    ? [
        hotel.location.address,
        hotel.location.ward.name,
        hotel.location.district.name,
        hotel.location.province.name,
      ].join(", ")
    : "";

  return !hotel ? (
    <div>Đang tải...</div>
  ) : (
    <div>
      <div>
        <img
          src={hotel.thumbnail}
          className="w-full h-[30rem] flex-1 object-cover bg-slate-100/50"
        />
      </div>
      <div className="mx-[5%] my-8">
        <div className="flex gap-8">
          <div className="space-y-8 w-full">
            <div className="space-y-2">
              <h1 className="font-bold text-2xl">
                <span className="uppercase text-green-500">[{hotel.type}]</span>{" "}
                {hotel.name}
              </h1>
              <div className="flex items-center gap-2">
                <Star size={20} stroke="#FDBE02" fill="#FDBE02" />
                {Array.from({ length: hotel.rating }).map((_, i) => (
                  <Star key={i} size={20} stroke="#FDBE02" fill="#FDBE02" />
                ))}
                <p className="flex-1">{hotel.rating_count} đánh giá</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon size={20} />
                <p className="flex-1">{address}</p>
              </div>
              <div className="flex items-center gap-2">
                <WifiIcon size={20} />
                <p className="flex-1">
                  {hotel.amenities.map((am) => am.name).join(", ")}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="font-bold text-2xl">Mô tả</h2>
              <p>{hotel.description}</p>
            </div>
            <div className="space-y-2 relative overflow-auto">
              <h2 className="font-bold text-2xl">Phòng</h2>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">Tên phòng</th>
                    <th className="px-6 py-3">Loại phòng</th>
                    <th className="px-6 py-3">Giá</th>
                    <th className="px-6 py-3">Sức chứa</th>
                    <th className="px-6 py-3">Đặt phòng</th>
                  </tr>
                </thead>
                <tbody>
                  {hotel.rooms.length > 0 ? (
                    hotel.rooms.map((room) => {
                      const isBooked = bookedRooms.some(
                        (bookedRoom) => bookedRoom._id === room._id
                      );
                      return (
                        <tr
                          key={room._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {room.name}
                          </th>
                          <td className="px-6 py-4">{room.type}</td>
                          <td className="px-6 py-4">
                            {formatCurrency(room.price)}
                          </td>
                          <td className="px-6 py-4">{room.capacity}</td>
                          <td className="px-6 py-4">
                            {isBooked ? (
                              <button
                                className="bg-red-700 hover:opacity-70 transition-opacity font-semibold text-white px-2 py-1 mt-2"
                                onClick={() => handleRemoveRoom(room._id)}
                              >
                                Hủy
                              </button>
                            ) : (
                              <button
                                className="bg-green-700 hover:opacity-70 transition-opacity font-semibold text-white px-2 py-1 mt-2"
                                onClick={() => handleAddRoom(room)}
                              >
                                Thêm
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4">
                        <p className="text-gray-500 text-center">
                          Không có phòng nào
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="space-y-2" id="reviews">
              <h2 className="text-2xl font-semibold mb-2">Đánh giá</h2>
              <review-list hotelId={hotelId} />
            </div>
            <RecommendHotels hotelId={hotelId} />
          </div>
          <div className="max-w-md w-full bg-gray-50 p-4 space-y-4 h-fit">
            <section className="space-y-2">
              <h2 className="text-lg font-bold">Đặt phòng</h2>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="start_date">Ngày nhận phòng</label>
                  <input
                    type="date"
                    id="start_date"
                    className="border border-gray-300 px-4 py-3"
                    value={checkInDate}
                    onChange={(e) => handleCheckInDate(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="end_date">Ngày trả phòng</label>
                  <input
                    type="date"
                    id="end_date"
                    className="border border-gray-300 px-4 py-3"
                    value={checkOutDate}
                    onChange={(e) => handleCheckOutDate(e.target.value)}
                  />
                </div>
              </div>
              <div>
                {bookedRooms.length > 0 ? (
                  bookedRooms.map((room) => (
                    <div
                      key={room._id}
                      className="flex items-center gap-4 border-b border-gray-300 py-2"
                    >
                      <p className="flex-1 text-sm">
                        <span className="text-green-700 uppercase">
                          [{room.type}]
                        </span>{" "}
                        {room.name} - {formatCurrency(room.price)}
                      </p>
                      <button
                        className="bg-red-700 text-white px-2 py-1"
                        onClick={() => handleRemoveRoom(room._id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center">
                    Chưa chọn phòng nào
                  </p>
                )}
              </div>
            </section>
            <section className="space-y-2">
              <div className="flex justify-between">
                <h2 className="font-bold text-lg">Tổng cộng</h2>
                <span>
                  {formatCurrency(
                    bookedRooms.reduce((acc, room) => acc + room.price, 0)
                  )}
                </span>
              </div>
            </section>
            <section className="col-span-2 space-y-2">
              <h2 className="font-bold text-lg">Hình thức thanh toán</h2>
              <select
                className="border border-gray-300 px-4 py-3 w-full"
                value={paymentMethod}
                onChange={(e) => handlePaymentMethod(e.target.value)}
              >
                <option value={PaymentMethod.CASH}>Thanh toán tại quầy</option>
                <option value={PaymentMethod.ONLINE_BANKING}>
                  Thanh toán online
                </option>
              </select>
            </section>
            <process-payment-button
              data={JSON.stringify({
                hotel_id: hotelId,
                room_ids: bookedRooms.map((room) => room._id),
                check_in_date: checkInDate,
                check_out_date: checkOutDate,
                payment_method: paymentMethod,
                total_price: bookedRooms.reduce(
                  (acc, room) => acc + room.price,
                  0
                ),
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
