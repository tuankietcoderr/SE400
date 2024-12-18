import { createResource, createSignal, Show } from "solid-js";
import instance from "../utils/axios-config";
import toast from "solid-toast";
import axios from "axios";
import { useAddress } from "../hooks/useAddress";

const Register = () => {
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirm_password.value;
    const name = e.target.name.value;
    const phone_number = e.target.phone_number.value;
    const address = e.target.address.value;

    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }

    const res = await instance.post("/auth/register", {
      email,
      password,
      name,
      phone_number,
      role: "customer",
      address: {
        address,
        province: selectedProvince(),
        district: selectedDistrict(),
        ward: selectedWard(),
      },
    });
    if (res.data.success) {
      toast.success("Đăng ký thành công!");
      window.location.href = "/";
    } else {
      toast.error("Đăng ký thất bại! " + res.data.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-4">
      <h1 className="text-center font-semibold text-2xl">Đăng ký</h1>
      <form className="mt-4 space-y-4" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <label htmlFor="name">Tên</label>
          <input
            type="text"
            id="name"
            className="border border-gray-300 px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="phone_number">SĐT</label>
          <input
            type="tel"
            id="phone_number"
            className="border border-gray-300 px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="confirm_password">Xác thực mật khẩu</label>
          <input
            type="password"
            id="confirm_password"
            className="border border-gray-300 px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="province">Tỉnh/Thành phố</label>
          <Show when={provinces()}>
            <select
              className="border border-gray-300 px-4 py-3"
              value={selectedProvince()?.code}
              onChange={(e) => {
                setSelectedProvince({
                  code: e.target.value,
                  name: e.target.options[e.target.selectedIndex].text,
                });
              }}
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
              value={selectedDistrict()?.code}
              onChange={(e) => {
                setSelectedDistrict({
                  code: e.target.value,
                  name: e.target.options[e.target.selectedIndex].text,
                });
              }}
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
              value={selectedWard()?.code}
              onChange={(e) => {
                setSelectedWard({
                  code: e.target.value,
                  name: e.target.options[e.target.selectedIndex].text,
                });
              }}
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
        <div className="mt-4">
          <button className="bg-green-500 text-white px-4 py-2">Đăng ký</button>
        </div>
        <p className="text-sm">
          Bạn đã có tài khoản?{" "}
          <a href="/user/login" className="text-green-500">
            Đăng nhập ngay
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
