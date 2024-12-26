import "../index.scss";
class ReviewButton extends HTMLElement {
  #_hotelId;
  constructor() {
    super();
  }

  connectedCallback() {
    this.#_hotelId = this.getAttribute("hotelId");

    this.innerHTML = /*html*/ `
         <button id="openModalBtn" class="mt-4 px-2 py-1 bg-green-700 text-white hover:bg-green-500 transition-colors text-sm">
      Đánh giá
    </button>
    <div id="modal" class="fixed inset-0 bg-black bg-opacity-50 items-center justify-center flex hidden">
      <div class="bg-white shadow-lg p-6 w-full max-w-md">
        <h2 class="text-lg font-semibold text-gray-800">Đánh giá khách sạn</h2>
  <form id="reviewForm" class="mt-4">

        <div class="flex items-center justify-evenly">
          <label for="rating1">
            <input type="radio" name="rating" id="rating1" value="1">
            <p>
              1
            </p>
        </label>
        <label for="rating2">
            <input type="radio" name="rating" id="rating2" value="2">
            <p>
              2
            </p>
        </label>
        <label for="rating3">
            <input type="radio" name="rating" id="rating3" value="3">
            <p>
              3
            </p>
        </label>
        <label for="rating4">
            <input type="radio" name="rating" id="rating4" value="4">
            <p>
              4
            </p>
        </label>
        <label for="rating5">
            <input type="radio" name="rating" id="rating5" value="5">
            <p>
              5
            </p>
        </label>
        </div>

        <textarea class="w-full mt-4 p-2 border border-gray-300" placeholder="Nhập đánh giá của bạn" name="comment"></textarea>

        <div class="mt-6 flex justify-end">
          <button id="closeModalBtn" class="px-4 py-2 bg-gray-300 hover:bg-gray-400 mr-2" type="button">
            Đóng
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
            Xác nhận
          </button>
        </div>
  </form>
      </div>
    </div>
      `;

    const openModalBtn = this.querySelector("#openModalBtn");
    const closeModalBtn = this.querySelector("#closeModalBtn");
    const modal = this.querySelector("#modal");

    openModalBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });

    closeModalBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    // Close modal on background click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });

    const reviewForm = this.querySelector("#reviewForm");

    reviewForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(reviewForm);
      const data = {
        rating: Number(formData.get("rating")),
        comment: formData.get("comment"),
        hotel_id: this.#_hotelId,
      };
      if (!data.rating || !data.comment) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
      }
      try {
        const res = await fetch(`http://localhost:8000/api/review`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(data),
        });
        const resData = await res.json();
        if (resData.success) {
          alert("Đánh giá thành công");
          modal.classList.add("hidden");
          location.reload();
        } else {
          alert("Đã xảy ra lỗi");
        }
      } catch (error) {
        alert("Đã xảy ra lỗi");
      }
    });
  }
}

window.customElements.define("review-button", ReviewButton);
