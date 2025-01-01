import React from "react";
import { DoorOpen, Heart, MapPin, Star, Wifi } from "lucide-react";
import { formatCurrency } from "../utils/formatter";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  return (
    <div className="border flex flex-col">
      <img src={hotel.thumbnail} className="w-full h-[260px] object-cover" />
      <div className="p-4 flex flex-col gap-3 flex-1">
        <p className="uppercase text-sm text-green-700">{hotel.type}</p>
        <div className="flex-1 flex flex-col justify-between gap-3">
          <div className="flex">
            <h3 className="text-xl font-semibold line-clamp-2 flex-1">
              {hotel.name}
            </h3>
            {/* <button>
            <Heart size={24} />
          </button> */}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Star size={16} stroke="#FDBE02" fill="#FDBE02" />
              <p>{hotel.rating > 0 ? hotel.rating.toFixed(2) : 0}/5</p>
              <p>{hotel.rating_count} đánh giá</p>
            </div>
            <div className="flex gap-2 text-sm text-slate-400">
              <Wifi size={16} />
              <p className="flex-1 line-clamp-2">
                {hotel.amenities.map((amenity) => amenity.name).join(", ")}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <MapPin size={16} className="mb-1" />
              <p className="flex-1">{hotel.location.province.name}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <DoorOpen size={16} className="mb-1" />
              <p className="flex-1">{hotel.rooms.length} phòng</p>
            </div>
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
