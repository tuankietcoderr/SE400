import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import instance from "../utils/axios-config";
import HotelCard from "../components/HotelCard";
import { useAddress } from "../hooks/useAddress";
import { Star } from "lucide-react";
import { HotelType } from "../lib/constant";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const ward = searchParams.get("ward");
  const district = searchParams.get("district");
  const province = searchParams.get("province");

  const [hotels, setHotels] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const {
    districts,
    provinces,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
    wards,
  } = useAddress();

  useEffect(() => {
    instance
      .get("/amenity")
      .then((res) => {
        setAmenities(res.data.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    instance
      .get("/hotel/search", {
        params: searchParams,
      })
      .then((res) => {
        setHotels(res.data.data);
      })
      .catch((err) => {});
  }, [searchParams.toString()]);

  useEffect(() => {
    if (ward) {
      setSelectedWard({
        code: ward,
        name: wards.find((w) => w.code === ward)?.name,
      });
    }
    if (district) {
      setSelectedDistrict({
        code: district,
        name: districts.find((d) => d.code === district)?.name,
      });
    }

    if (province) {
      setSelectedProvince({
        code: province,
        name: provinces.find((p) => p.code === province)?.name,
      });
    }
  }, [ward, district, province]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const query = new URLSearchParams();

    for (const [key, value] of formData) {
      if (!value) continue;
      query.append(key, value);
    }

    selectedWard?.code && query.append("ward", selectedWard?.code);
    selectedDistrict?.code && query.append("district", selectedDistrict?.code);
    selectedProvince?.code && query.append("province", selectedProvince?.code);

    setSearchParams(query);
  };

  const onReset = () => {
    setSearchParams("");
    setSelectedWard(null);
    setSelectedDistrict(null);
    setSelectedProvince(null);
  };

  return (
    <div className="mx-[5%] my-8 flex gap-8">
      <aside className="max-w-[300px] w-full">
        <form onSubmit={onSubmit} onReset={onReset}>
          <h2 className="text-2xl font-semibold mb-2">Bộ lọc</h2>
          <div className="border p-4">
            <h3 className="text-xl font-semibold">Tìm kiếm</h3>
            <input
              type="text"
              name="keyword"
              placeholder="Tìm kiếm khách sạn"
              className="border w-full px-4 py-2 mt-4"
              defaultValue={searchParams.get("keyword")}
            />
          </div>
          <div className="border p-4">
            <h3 className="text-xl font-semibold">Địa chỉ</h3>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="province">Tỉnh/Thành phố</label>
                <select
                  className="border border-gray-300 px-4 py-3"
                  value={selectedProvince?.code}
                  onChange={(e) => {
                    setSelectedProvince({
                      code: e.target.value,
                      name: e.target.options[e.target.selectedIndex].text,
                    });
                  }}
                >
                  <option value="">Chọn tỉnh/thành phố</option>
                  {provinces.map((province) => (
                    <option value={province.code} key={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="province">Quận/Huyện</label>
                <select
                  className="border border-gray-300 px-4 py-3"
                  value={selectedDistrict?.code}
                  onChange={(e) => {
                    setSelectedDistrict({
                      code: e.target.value,
                      name: e.target.options[e.target.selectedIndex].text,
                    });
                  }}
                >
                  <option value="">Chọn quận/huyện</option>
                  {districts.map((district) => (
                    <option value={district.code} key={district.code}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="province">Phường/Xã</label>
                <select
                  className="border border-gray-300 px-4 py-3"
                  value={selectedWard?.code}
                  onChange={(e) => {
                    setSelectedWard({
                      code: e.target.value,
                      name: e.target.options[e.target.selectedIndex].text,
                    });
                  }}
                >
                  <option value="">Chọn phường/xã</option>
                  {wards.map((ward) => (
                    <option value={ward.code} key={ward.code}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="border p-4">
            <h3 className="text-xl font-semibold">Sắp xếp theo</h3>
            <div className="flex flex-col gap-2 mt-4">
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="price_desc"
                  className="mr-2"
                  defaultChecked={searchParams.get("sort") === "price_desc"}
                />
                Giá thấp đến cao
              </label>

              <label>
                <input
                  type="radio"
                  name="sort"
                  value="price_asc"
                  className="mr-2"
                  defaultChecked={searchParams.get("sort") === "price_asc"}
                />
                Giá cao đến thấp
              </label>

              <label>
                <input
                  type="radio"
                  name="sort"
                  value="rating_desc"
                  className="mr-2"
                  defaultChecked={searchParams.get("sort") === "rating_desc"}
                />
                Đánh giá cao nhất
              </label>

              <label>
                <input
                  type="radio"
                  name="sort"
                  value="rating_asc"
                  className="mr-2"
                  defaultChecked={searchParams.get("sort") === "rating_asc"}
                />
                Đánh giá thấp nhất
              </label>
            </div>
          </div>

          <div className="border p-4">
            <h3 className="text-xl font-semibold">Khoảng giá</h3>
            <div className="flex flex-col gap-2 mt-4">
              <label>
                <input
                  type="radio"
                  name="price"
                  value="0-100000"
                  className="mr-2"
                  defaultChecked={searchParams.get("price") === "0-100000"}
                />
                Dưới 100k
              </label>

              <label>
                <input
                  type="radio"
                  name="price"
                  value="100000-500000"
                  className="mr-2"
                  defaultChecked={searchParams.get("price") === "100000-500000"}
                />
                100k - 500k
              </label>

              <label>
                <input
                  type="radio"
                  name="price"
                  value="500000-1000000"
                  className="mr-2"
                  defaultChecked={
                    searchParams.get("price") === "500000-1000000"
                  }
                />
                500k - 1 triệu
              </label>

              <label>
                <input
                  type="radio"
                  name="price"
                  value="1000000-"
                  className="mr-2"
                  defaultChecked={searchParams.get("price") === "1000000-"}
                />
                Trên 1 triệu
              </label>
            </div>
          </div>

          <div className="border p-4">
            <h3 className="text-xl font-semibold">Số sao</h3>
            <div className="flex flex-col gap-2 mt-4">
              {Array.from({ length: 5 }, (_, i) => (
                <label key={i + 1}>
                  <input
                    type="checkbox"
                    name="star"
                    value={5 - i}
                    className="mr-2"
                    defaultChecked={searchParams
                      .getAll("star")
                      .includes(`${5 - i}`)}
                  />
                  {Array.from({ length: 5 - i }, (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      stroke="#FDBE02"
                      fill="#FDBE02"
                      className="inline-block mb-1"
                    />
                  ))}
                </label>
              ))}
            </div>
          </div>

          <div className="border p-4">
            <h3 className="text-xl font-semibold">Lọc theo loại khách sạn</h3>
            <div className="flex flex-col gap-2 mt-4">
              {Object.values(HotelType).map((type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    name="type"
                    value={type}
                    className="mr-2"
                    defaultChecked={searchParams.getAll("type").includes(type)}
                  />
                  <span className="uppercase">{type.replace(/_/g, " ")}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border p-4">
            <h3 className="text-xl font-semibold">Lọc theo tiện ích</h3>
            <div className="flex flex-col gap-2 mt-4">
              {amenities.map((amenity) => (
                <label key={amenity._id}>
                  <input
                    type="checkbox"
                    name="amenity"
                    value={amenity._id}
                    className="mr-2"
                    defaultChecked={searchParams
                      .getAll("amenity")
                      .includes(amenity._id)}
                  />
                  {amenity.name}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              className="bg-green-700 text-white px-4 py-2 mt-4 w-full"
              type="submit"
            >
              Áp dụng
            </button>

            <button
              className="bg-gray-300 text-black px-4 py-2 mt-4 w-full"
              type="reset"
            >
              Xóa bộ lọc
            </button>
          </div>
        </form>
      </aside>
      <section className="flex-1">
        <h2 className="text-2xl font-semibold mb-2">Kết quả tìm kiếm</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4">
          {hotels ? (
            hotels.length > 0 ? (
              hotels.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)
            ) : (
              <p>Không tìm thấy khách sạn nào</p>
            )
          ) : (
            <p>Đang tải dữ liệu...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Search;
