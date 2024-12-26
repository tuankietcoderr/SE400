import "./review-card";
class ReviewList extends HTMLElement {
  #_hotelId;
  constructor() {
    super();
  }

  connectedCallback() {
    this.#_hotelId = this.getAttribute("hotelId");
    fetch(`http://localhost:8000/api/review/hotel/${this.#_hotelId}`)
      .then((res) => res.json())
      .then((data) => {
        this.innerHTML = /*html*/ `
            <div class="space-y-2">
                ${
                  data.data?.length > 0
                    ? data.data.map(
                        (review) => /*html*/ `
                    <review-card review='${JSON.stringify(
                      review
                    )}' showRemoveBtn="false"></review-card>
                `
                      )
                    : `<p class="text-gray-500">Không có đánh giá nào</p>`
                }
            </div>
        `;
      })
      .catch((err) => {
        this.innerHTML = /*html*/ `
                <p class="space-y-2">
                    <p>Không có đánh giá nào</p>
                </p>
        `;
      });
  }
}

window.customElements.define("review-list", ReviewList);
