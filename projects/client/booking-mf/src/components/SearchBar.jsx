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
    const ward = selectedWard;
    const district = selectedDistrict;
    const province = selectedProvince;
    if (!ward || !district || !province) {
      alert("Vui lòng chọn đầy đủ thông tin địa chỉ");
      return;
    }
    location.href = `/search?ward=${ward.code}&district=${district.code}&province=${province.code}`;
  };

  return (
    <form
      className="flex flex-col justify-center items-center w-full"
      onSubmit={onSubmit}
    >
      <h1 className="text-xl font-bold">Tìm kiếm</h1>
      <div className="max-w-3xl flex flex-col justify-center mt-2 items-center w-full gap-4 border p-4">
        <div className="flex w-full gap-4 items-end">
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
        <button className="bg-green-700 text-white px-4 py-2 flex-1">
          Tìm kiếm
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
