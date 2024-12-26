import { createEffect, createSignal, Match, Show, Switch } from "solid-js";
import { useUserContext } from "../context/UserContext";
import { Mail, MapPinHouse, Phone, UserPen } from "lucide-solid";
import instance from "../utils/axios-config";
import toast from "solid-toast";

const UserProfileInformation = () => {
  const { user, mutate } = useUserContext();
  const [isEditMode, setIsEditMode] = createSignal(false);

  const handleSave = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone_number = e.target.phone_number.value;

    const data = {
      name,
      email,
      phone_number,
    };

    const res = await instance.put("/auth/me", data);
    if (res.data.success) {
      toast.success("Cập nhật thông tin thành công!");
      setIsEditMode(false);
      mutate(res.data.data);
      return;
    }
    toast.error("Cập nhật thông tin thất bại! " + res.data.message);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">Thông tin hồ sơ</h1>
      <div className="p-4 shadow border space-y-2 min-h-20">
        <Switch>
          <Match when={user.loading}>
            <p>
              <span className="animate-pulse">Đang tải...</span>
            </p>
          </Match>
          <Match when={user.error}>
            <p>
              <span className="text-red-500">Đã xảy ra lỗi!</span>
            </p>
          </Match>
          <Match when={user() && !isEditMode()}>
            <div className="flex gap-2 items-center">
              <h1 className="text-xl font-semibold flex-1">{user().name}</h1>
              <button
                className="border p-2 hover:bg-gray-200 bg-white transition-colors"
                onClick={() => setIsEditMode(true)}
              >
                <UserPen size={20} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <p className="flex-1">{user().email}</p>
            </div>
            <Show when={user().phone_number}>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <p className="flex-1">{user().phone_number}</p>
              </div>
            </Show>
          </Match>
          <Match when={isEditMode()}>
            <div>
              <div className="flex gap-2 items-center">
                <h1 className="text-xl font-semibold flex-1">
                  Chỉnh sửa thông tin
                </h1>
                <button
                  className="border px-4 py-2 hover:bg-gray-200 bg-white transition-colors text-sm"
                  onClick={() => setIsEditMode(false)}
                >
                  Hủy
                </button>
              </div>
              <form className="space-y-4" onSubmit={handleSave}>
                <div className="flex flex-col gap-4">
                  <label htmlFor="name">Họ và tên</label>
                  <input
                    type="text"
                    id="name"
                    className="border border-gray-300 px-4 py-2"
                    required
                    value={user().name}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label htmlFor="email">Email/SĐT</label>
                  <input
                    type="email"
                    id="email"
                    className="border border-gray-300 px-4 py-2"
                    required
                    value={user().email}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label htmlFor="phone_number">Số điện thoại</label>
                  <input
                    type="tel"
                    id="phone_number"
                    className="border border-gray-300 px-4 py-2"
                    required
                    value={user().phone_number}
                  />
                </div>

                <button className="bg-green-500 text-white px-4 py-2">
                  Lưu
                </button>
              </form>
            </div>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default UserProfileInformation;
