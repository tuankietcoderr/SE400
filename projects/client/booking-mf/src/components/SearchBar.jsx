import { useAddress } from "../hooks/useAddress";

const SearchBar = () => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    const adult = Number(e.target.adult.value || 0);
    const child = Number(e.target.child.value || 0);
    const startDate = e.target.start_date.value;
    const endDate = e.target.end_date.value;
    const ward = selectedWard;
    const district = selectedDistrict;
    const province = selectedProvince;
    if (!ward || !district || !province) {
      alert("Vui lòng chọn đầy đủ thông tin địa chỉ");
      return;
    }
    if (startDate >= endDate) {
      alert("Ngày kết thúc phải sau ngày bắt đầu");
      return;
    }
    if (adult + child === 0) {
      alert("Vui lòng chọn số lượng khách");
      return;
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center w-full"
      onSubmit={onSubmit}
    >
      <h1 className="text-xl font-bold">Tìm kiếm</h1>
      <div className="max-w-3xl flex flex-col justify-center mt-2 items-center w-full gap-4 border p-4">
        <div className="flex w-full gap-4 items-center">
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
              {wards.map((ward) => (
                <option value={ward.code} key={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
        </div>
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
        <button className="bg-green-700 text-white px-4 py-2">Tìm kiếm</button>
      </div>
    </form>
  );
};

export default SearchBar;
