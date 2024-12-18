import toast from "solid-toast";
import { useAddress } from "../hooks/useAddress";
import instance from "../utils/axios-config";
import { createEffect } from "solid-js";

const AddAddressForm = ({ onClose, onSubmit, addressId }) => {
  const {
    districts,
    provinces,
    wards,
    selectedDistrict,
    selectedProvince,
    selectedWard,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
  } = useAddress();

  const isEdit = !!addressId;

  const onAddAddress = async (e) => {
    e.preventDefault();
    const address = e.target.address.value;
    const data = {
      country: "Việt Nam",
      province: selectedProvince(),
      district: selectedDistrict(),
      ward: selectedWard(),
      address,
    };
    if (isEdit) {
      const res = await instance.put(`/address/${addressId}`, data);
      if (res.data.success) {
        onSubmit();
        toast.success("Cập nhật địa chỉ thành công!");
      }
      return;
    }
    const res = await instance.post("/address", data);
    if (res.data.success) {
      onSubmit();
      toast.success("Thêm địa chỉ thành công!");
    }
  };

  return (
    <form className="space-y-4 border-b mb-4 pb-4" onSubmit={onAddAddress}>
      <div className="flex flex-col gap-4">
        <label htmlFor="province">Tỉnh/Thành phố</label>
        <Show when={provinces()}>
          <select
            className="border border-gray-300 px-4 py-3"
            onChange={(e) => {
              setSelectedProvince({
                code: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
              });
            }}
            value={selectedProvince()?.code}
          >
            {provinces().map((province) => (
              <option value={province.code}>{province.name}</option>
            ))}
          </select>
        </Show>
      </div>
      <Show when={districts()}>
        <div className="flex flex-col gap-4">
          <label htmlFor="province">Quận/Huyện</label>
          <select
            className="border border-gray-300 px-4 py-3"
            onChange={(e) => {
              setSelectedDistrict({
                code: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
              });
            }}
            value={selectedDistrict()?.code}
          >
            {districts().map((district) => (
              <option value={district.code}>{district.name}</option>
            ))}
          </select>
        </div>
      </Show>

      <Show when={wards()}>
        <div className="flex flex-col gap-4">
          <label htmlFor="province">Phường/Xã</label>
          <select
            className="border border-gray-300 px-4 py-3"
            onChange={(e) => {
              setSelectedWard({
                code: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
              });
            }}
            value={selectedWard()?.code}
          >
            {wards().map((ward) => (
              <option value={ward.code}>{ward.name}</option>
            ))}
          </select>
        </div>
      </Show>
      <div className="flex flex-col gap-4">
        <label htmlFor="name">Địa chỉ cụ thể</label>
        <input
          type="address"
          placeholder="Số nhà, tên đường"
          id="address"
          className="border border-gray-300 px-4 py-2"
          required
        />
      </div>
      <button className="bg-green-500 text-white px-4 py-2">
        {isEdit ? "Lưu" : "Thêm"}
      </button>
      <button
        className="border-green-500 border text-green-500 px-4 py-2 ml-2"
        onClick={onClose}
      >
        Huỷ
      </button>
    </form>
  );
};

export default AddAddressForm;
