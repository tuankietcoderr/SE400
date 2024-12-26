import { createResource, For, Match, Switch } from "solid-js";
import instance from "../utils/axios-config";
import "review_mf/reviewCard";

const ReviewHistoryList = () => {
  const [reviews] = createResource(
    async () => {
      const res = await instance.get("/review/user");
      return res.data.data;
    },
    {
      initialValue: [],
    }
  );

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">Đã đánh giá</h1>
      <Switch>
        <Match when={reviews.loading}>Đang tải...</Match>
        <Match when={reviews.error}>Đã xảy ra lỗi</Match>
        <Match when={reviews()}>
          <div className="space-y-4">
            <For each={reviews()} fallback={<div>Không có dữ liệu</div>}>
              {(review) => (
                <div>
                  <review-card
                    attr:review={JSON.stringify(review)}
                    attr:showRemoveBtn={true}
                  />
                </div>
              )}
            </For>
          </div>
        </Match>
      </Switch>
    </div>
  );
};

export default ReviewHistoryList;
