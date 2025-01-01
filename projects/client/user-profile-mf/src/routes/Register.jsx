import instance from "../utils/axios-config";
import toast from "solid-toast";

const Register = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirm_password.value;
    const name = e.target.name.value;
    const phone_number = e.target.phone_number.value;

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
    });
    if (res.data.success) {
      toast.success("Đăng ký thành công!");
      window.location.href = "/";
    } else {
      toast.error("Đăng ký thất bại! " + res.data.message);
    }
  };

  const googleLogin = async () => {
    window.location.href =
      "https://se400-production.up.railway.app/api/auth/google";
  };

  return (
    <div className="max-w-md mx-auto my-4">
      <h1 className="text-center font-semibold text-2xl">Đăng ký</h1>
      <form className="mt-4 space-y-4" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Tên</label>
          <input
            type="text"
            id="name"
            className="border border-gray-300 px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone_number">SĐT</label>
          <input
            type="tel"
            id="phone_number"
            className="border border-gray-300 px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 px-4 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirm_password">Xác thực mật khẩu</label>
          <input
            type="password"
            id="confirm_password"
            className="border border-gray-300 px-4 py-2"
            required
          />
        </div>
        <div className="mt-4 space-y-2">
          <button className="w-full bg-green-500 text-white px-4 py-2">
            Đăng ký
          </button>
          <p className="text-xs text-center text-gray-500">hoặc</p>
          <button
            type="button"
            onClick={googleLogin}
            className="bg-white border text-black px-4 py-2 w-full"
          >
            Đăng ký với Google
          </button>
        </div>
        <p className="text-sm text-center">
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
