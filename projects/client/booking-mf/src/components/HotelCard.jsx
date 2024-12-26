import React from "react";
import { DoorOpen, Heart, MapPin, Star } from "lucide-react";
import { formatCurrency } from "../utils/formatter";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  return (
    <div className="border">
      <img src={hotel.thumbnail} className="w-full h-[260px] object-cover" />
      <div className="p-4 space-y-4">
        <p className="uppercase text-sm">{hotel.type}</p>
        <div className="flex">
          <h3 className="text-xl font-semibold line-clamp-2 flex-1">
            {hotel.name}
          </h3>
          {/* <button>
            <Heart size={24} />
          </button> */}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Star size={16} stroke="#FDBE02" fill="#FDBE02" />
          <p>{hotel.rating}/5</p>
          <p>{hotel.rating_count} đánh giá</p>
        </div>
        <hr />
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 flex-1">
            <MapPin size={16} />
            <p className="flex-1">{hotel.location.province.name}</p>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <DoorOpen size={16} />
            <p className="flex-1">{hotel.rooms.length} phòng</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-xl font-semibold flex-1">
            {formatCurrency(hotel.price)}
          </p>
          <a href={hotel._id} className="bg-green-700 text-white px-4 py-2">
            Xem phòng
          </a>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
