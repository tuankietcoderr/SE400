const ForgotPassword = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
  };

  return (
    <div className="max-w-lg mx-auto mt-4">
      <h1 className="text-center font-semibold text-2xl">Quên mật khẩu</h1>
      <form className="mt-4 space-y-4" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <label htmlFor="email">Email/SĐT</label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 px-4 py-2"
            required
          />
        </div>
        <div className="mt-4">
          <button className="bg-green-500 text-white px-4 py-2">
            Khôi phục mật khẩu
          </button>
        </div>
        <p className="text-sm">
          Bạn đã có tài khoản khác?{" "}
          <a href="/user/login" className="text-green-500">
            Đăng nhập ngay
          </a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
