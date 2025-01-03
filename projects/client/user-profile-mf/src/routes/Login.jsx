import instance from "../utils/axios-config";
import toast from "solid-toast";

const Login = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await instance.post("/auth/login", {
      email,
      password,
    });
    if (res.data.success) {
      setTimeout(() => {
        window.location.href = "/";
      }, 0);
    } else {
      toast.error(res.data.message);
    }
  };

  const googleLogin = async () => {
    window.location.href =
      "https://se400-production.up.railway.app/api/auth/google";
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      <h1 className="text-center font-semibold text-2xl">Đăng nhập</h1>
      <form className="mt-4 space-y-4" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email/SĐT</label>
          <input
            type="email"
            id="email"
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
          <a
            href="/user/forgot-password"
            className="text-green-500 text-sm underline text-right"
          >
            Quên mật khẩu?
          </a>
        </div>
        <div className="mt-4 space-y-2">
          <button className="bg-green-500 text-white px-4 py-2 w-full">
            Đăng nhập
          </button>
          <p className="text-xs text-center text-gray-500">hoặc</p>
          <button
            type="button"
            onClick={googleLogin}
            className="bg-white border text-black px-4 py-2 w-full"
          >
            Đăng nhập với Google
          </button>
        </div>
        <p className="text-sm text-center">
          Bạn chưa có tài khoản?{" "}
          <a href="/user/register" className="text-green-500">
            Đăng ký ngay
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
