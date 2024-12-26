class ReviewCard extends HTMLElement {
  #_review;
  #_showRemoveBtn;
  #_userId;
  constructor() {
    super();
  }

  connectedCallback() {
    this.#_review = JSON.parse(this.getAttribute("review"));
    this.#_showRemoveBtn = this.getAttribute("showRemoveBtn") === "true";
    this.#_userId = this.getAttribute("userId");
    console.log(this.#_showRemoveBtn);
    const review = this.#_review;
    this.innerHTML = /*html*/ `
        <div class="border border-gray-200 p-2 shadow">
            <p class="font-semibold">${
              review.user_id._id === this.#_userId
                ? "Bạn"
                : review.user_id.name || "Người dùng"
            }</p>
                <span class="text-xs text-gray-500 font-normal">${new Date(
                  review.createdAt
                ).toLocaleString()}</span>
            </p>
            <p>
                <span class="text-yellow-400">
                ${Array.from({ length: review.rating }, (_, i) => "⭐").join(
                  ""
                )}
                </span>
            </p>
            <p>${review.comment}</p>
            <button class="text-red-500 hover:underline text-sm" id="remove-rv-btn">Xóa</button>
        </div>
    `;

    const removeRvBtn = this.querySelector("#remove-rv-btn");
    if (!this.#_showRemoveBtn) {
      removeRvBtn.style.display = "none";
    }

    removeRvBtn.addEventListener("click", async () => {
      const res = await fetch(
        `http://localhost:8000/api/review/${review._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        this.remove();
      } else {
        alert("Xóa thất bại");
      }
    });
  }
}

window.customElements.define("review-card", ReviewCard);
