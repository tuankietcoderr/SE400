import React, { useEffect, useState } from "react";
import instance from "../utils/axios-config";
import HotelCard from "./HotelCard";

const SuggestHotels = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    instance.get("/hotel").then((res) => {
      setHotels(res.data.data);
    });
  }, []);

  return (
    <section className="mx-[5%] space-y-4">
      <h2 className="text-2xl font-semibold">Gợi ý khách sạn</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4">
        {hotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </section>
  );
};

export default SuggestHotels;
