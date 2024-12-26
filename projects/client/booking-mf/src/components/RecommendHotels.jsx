import React, { useEffect, useState } from "react";
import instance from "../utils/axios-config";
import HotelCard from "./HotelCard";

const SuggestHotels = ({ hotelId }) => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    instance.get(`/hotel/${hotelId}/relative`).then((res) => {
      setHotels(res.data.data);
    });
  }, []);

  return (
    <section className="space-y-2">
      <h2 className="text-2xl font-semibold">Khách sạn liên quan</h2>
      <div
        className={"grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-4"}
      >
        {hotels.length > 0 ? (
          hotels.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)
        ) : (
          <p className="text-gray-500">Không có khách sạn liên quan</p>
        )}
      </div>
    </section>
  );
};

export default SuggestHotels;
