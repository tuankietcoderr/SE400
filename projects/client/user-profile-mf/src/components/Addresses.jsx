import {
  createEffect,
  Match,
  Show,
  Switch,
  lazy,
  createSignal,
  createResource,
  Suspense,
} from "solid-js";
import { useUserContext } from "../context/UserContext";
import { useAddress } from "../hooks/useAddress";
import { Plus } from "lucide-solid";
import instance from "../utils/axios-config";
import toast from "solid-toast";

const AddAddressForm = lazy(() => import("./AddAddressForm"));

const Addresses = () => {
  const { user } = useUserContext();
  const [showForm, setShowForm] = createSignal(false);
  const [addresses, { refetch }] = createResource(
    async () => {
      const res = await instance.get("/address/user");
      return res.data.data;
    },
    {
      initialValue: [],
    }
  );

  const setDefault = async (id) => {
    const res = await instance.put(`/address/${id}/default`);
    if (res.data.success) {
      refetch();
      toast.success("Đặt địa chỉ mặc định thành công!");
    } else {
      toast.error(res.data.message);
    }
  };

  const onDelete = async (id) => {
    const pr = confirm("Bạn có chắc chắn muốn xoá địa chỉ này không?");
    if (!pr) return;
    const res = await instance.delete(`/address/${id}`);
    if (res.data.success) {
      refetch();
      toast.success("Xoá địa chỉ thành công!");
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <div className="p-4 shadow border space-y-2 min-h-20">
      <div className="flex gap-2 items-center">
        <h1 className="text-xl font-semibold flex-1">Danh sách địa chỉ</h1>
        <button
          className="border p-2 hover:bg-gray-200 bg-white transition-colors text-sm"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm() ? "Huỷ" : <Plus size={20} />}
        </button>
      </div>
      <Show when={user.loading || addresses.loading}>
        <p>
          <span className="animate-pulse">Đang tải...</span>
        </p>
      </Show>
      <Show when={showForm()}>
        <AddAddressForm
          onClose={() => setShowForm(false)}
          onSubmit={() => {
            refetch();
            setShowForm(false);
          }}
        />
      </Show>
      <Show when={addresses().length === 0}>
        <p>Chưa có địa chỉ nào!</p>
      </Show>
      <Show when={addresses().length > 0}>
        <ul className="space-y-2">
          {addresses().map((address, index) => {
            const [showEditForm, setShowEditForm] = createSignal(false);
            return (
              <li key={address._id}>
                <p className="font-semibold">{address.address}</p>
                <p>
                  {address.country}, {address.province.name},{" "}
                  {address.district.name}, {address.ward.name}
                </p>
                <div className="inline-flex gap-2">
                  {address.is_default ? (
                    <p className="text-green-500/60 text-sm cursor-not-allowed select-none pointer-events-none">
                      Mặc định
                    </p>
                  ) : (
                    <button
                      className="text-green-500 font-medium text-sm"
                      onClick={() => setDefault(address._id)}
                    >
                      Đặt làm địa chỉ mặc định
                    </button>
                  )}
                  <button
                    className="text-sm"
                    onClick={() => setShowEditForm(true)}
                  >
                    Sửa
                  </button>
                  {!address.is_default && (
                    <button
                      className="text-gray-400 text-sm"
                      onClick={() => onDelete(address._id)}
                    >
                      Xoá
                    </button>
                  )}
                </div>
                <Show when={showEditForm()}>
                  <AddAddressForm
                    onClose={() => setShowEditForm(false)}
                    onSubmit={() => {
                      refetch();
                      setShowEditForm(false);
                    }}
                    addressId={address._id}
                  />
                </Show>
                {index !== addresses().length - 1 && <hr className="mt-2" />}
              </li>
            );
          })}
        </ul>
      </Show>
    </div>
  );
};

export default Addresses;
