import("./App");
import { formatCurrency } from "./utils/formatter";

const mount = (el) => {
  if (el) {
    const params = new URLSearchParams(location.search);
    const amount = Number(params.get("vnp_Amount"));
    const info = params.get("vnp_OrderInfo");
    const responseCode = params.get("vnp_ResponseCode");
    if (responseCode !== "00") {
      el.innerHTML = /*html*/ `
        <div class="flex justify-center items-center h-[80vh]">
            <div class="bg-gray-100 p-4 max-w-lg w-full shadow-lg flex items-center gap-4 flex-col">
                <img src="https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png" class="size-20" />
                <h1 class="text-2xl font-semibold text-center">Thanh toán thất bại</h1>
                <p class="text-red-700 text-4xl font-bold">${formatCurrency(
                  amount / 100
                )}</p>
                <a href="/" class="text-blue-500 underline">
                    Trở về trang chủ
                </a>
            </div>
        </div>
        `;
      return;
    }
    fetch(
      `https://se400-production.up.railway.app/api/payment/${info}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          status: "success",
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          el.innerHTML = /*html*/ `
            <div class="flex justify-center items-center h-[80vh]">
                <div class="bg-gray-100 p-4 max-w-lg w-full shadow-lg flex items-center gap-4 flex-col">
                    <img src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png" class="size-20" />
                    <h1 class="text-2xl font-semibold text-center">Thanh toán thành công</h1>
                    <p class="text-green-700 text-4xl font-bold">${formatCurrency(
                      amount / 100
                    )}</p>
                    <p class="text-gray-500 text-lg">${info}</p>
                    <a href="/" class="text-blue-500 underline">
                            Trở về trang chủ
                        </a>
                </div>
            </div>
        `;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

if (process.env.NODE_ENV === "development") {
  const root = document.getElementById("app");

  root && mount(root);
}

export { mount };
