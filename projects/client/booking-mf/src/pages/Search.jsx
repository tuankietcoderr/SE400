import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import instance from "../utils/axios-config";
import HotelCard from "../components/HotelCard";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const ward = searchParams.get("ward");
  const district = searchParams.get("district");
  const province = searchParams.get("province");

  const [hotels, setHotels] = useState([]);
  console.log(hotels);
  useEffect(() => {
    instance
      .get("/hotel/search", {
        params: {
          ward,
          district,
          province,
        },
      })
      .then((res) => {
        setHotels(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="mx-[5%] my-8 space-y-4">
      <h2 className="text-2xl font-semibold">Kết quả tìm kiếm</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-4">
        {hotels.length > 0 ? (
          hotels.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)
        ) : (
          <p>Không tìm thấy khách sạn nào</p>
        )}
      </div>
    </section>
  );
};

export default Search;
