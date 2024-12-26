import value1 from "../public/value-1.png";
import value2 from "../public/value-2.png";
import value3 from "../public/value-3.png";
import "../index.scss";

class Value extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/ `
      <div class="bg-[#FFFDF5] flex justify-evenly items-center gap-4 h-[240px]">
        <div class="flex items-center gap-2">
            <img src=${value1} width={80} height={80} class="size-10"/>
            <p>
                Quy trình đặt phòng an toàn và bảo mật
            </p>
        </div>
        <div class="flex items-center gap-2">
            <img src=${value2} width={80} height={80} class="size-10"/>
            <p>
                Hủy miễn phí tại hầu hết các khách sạn *
            </p>
        </div>
        <div class="flex items-center gap-2">
            <img src=${value3} width={80} height={80} class="size-10"/>
            <p>
                Dịch vụ khách hàng tiêu chuẩn vàng
            </p>
        </div>
      </div>
    `;
  }
}

window.customElements.define("app-value", Value);
