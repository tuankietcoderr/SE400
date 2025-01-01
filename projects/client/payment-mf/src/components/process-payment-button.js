import { PaymentMethod } from "../lib/constant";

class ProcessPaymentButton extends HTMLElement {
  #data;

  constructor() {
    super();
  }

  onClickPayment() {
    this.#data = JSON.parse(this.getAttribute("data"));
    if (this.#data) {
      if (this.#data.total_price === 0) {
        alert("Vui lòng chọn phòng");
        return;
      }

      if (this.#data.check_in_date >= this.#data.check_out_date) {
        alert("Ngày nhận phòng phải trước ngày trả phòng");
        return;
      }

      const paymentMethod = this.#data.payment_method;

      fetch(
        `https://se400-production.up.railway.app/api/payment/create/${paymentMethod}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(this.#data),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            if (data.data) {
              window.location.href = data.data;
            } else {
              alert("Chúng tôi đã tiến hành đặt phòng cho bạn");
              location.reload();
            }
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  connectedCallback() {
    this.innerHTML = /*html*/ `
      <button
        class="bg-green-700 w-full hover:bg-green-500 font-semibold text-white px-4 py-2 mt-4"
        id="process-payment"
        >
            Tiến hành thanh toán
        </button>
    `;

    document
      .querySelector("#process-payment")
      .addEventListener("click", this.onClickPayment.bind(this));
  }
}

window.customElements.define("process-payment-button", ProcessPaymentButton);
