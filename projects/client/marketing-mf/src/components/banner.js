import travelConcept from "../public/travel-concept.jpg";
import "../index.scss";
class Banner extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/ `
      <div class="h-[80vh] justify-end flex items-start flex-col relative bg-gradient-to-t from-black to-transparent">
        <div class="bg-primary/80 w-full p-[5%]">
          <p class="text-5xl font-bold text-white">
            Chào mừng bạn đến với chúng tôi,<br />nơi bạn có thể tìm khách sạn <span class="underline text-secondary">với giá
            hấp dẫn.</span>
          </p>
          <p class="text-white mt-4">
            Được xây dựng lại để giúp việc tìm kiếm khách sạn trở nên đơn giản và nhanh chóng, vì vậy bạn có thể dành nhiều thời gian hơn để khám phá.
          </p>
        </div>
        <img src=${travelConcept} class="absolute inset-0 object-cover z-[-1] size-full"/>
        <div />
      </div>
    `;
  }
}

window.customElements.define("app-banner", Banner);
