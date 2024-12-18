import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../utils/axios-config";

const HotelDetail = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    instance.get(`/hotel/${hotelId}`).then((res) => {
      setHotel(res.data.data);
    });
  }, []);

  return !hotel ? (
    <div>Đang tải...</div>
  ) : (
    <div>
      <div>
        <img
          src={hotel.thumbnail}
          className="w-full h-[30rem] object-contain bg-slate-100/50"
        />
      </div>
      <div className="flex gap-4">
        <div></div>
        <div className="max-w-xl w-full">
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="start_date">Ngày bắt đầu</label>
              <input
                type="date"
                id="start_date"
                className="border border-gray-300 px-4 py-3"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="end_date">Ngày kết thúc</label>
              <input
                type="date"
                id="end_date"
                className="border border-gray-300 px-4 py-3"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <p className="col-span-2 text-center">Số lượng khách</p>
            <div className="flex items-center gap-2">
              <label htmlFor="adult" className="w-20 block">
                Người lớn
              </label>
              <input
                type="number"
                id="adult"
                min={1}
                max={10}
                defaultValue={1}
                className="border border-gray-300 px-4 py-3"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="child" className="w-20 block">
                Trẻ em
              </label>
              <input
                type="number"
                id="child"
                min={0}
                max={10}
                defaultValue={0}
                className="border border-gray-300 px-4 py-3"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
