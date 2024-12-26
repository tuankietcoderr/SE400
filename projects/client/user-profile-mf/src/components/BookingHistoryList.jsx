import { createResource, For, Match, Switch } from "solid-js";
import instance from "../utils/axios-config";
import BookingCard from "./BookingCard";

const BookingHistoryList = () => {
  const [bookings, { refetch }] = createResource(
    async () => {
      const res = await instance.get("/booking/user");
      return res.data.data;
    },
    {
      initialValue: [],
    }
  );
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">Lịch sử đặt phòng</h1>
      <Switch>
        <Match when={bookings.loading}>Đang tải...</Match>
        <Match when={bookings.error}>Đã xảy ra lỗi</Match>
        <Match when={bookings()}>
          <div className="space-y-4">
            <For each={bookings()} fallback={<div>Không có dữ liệu</div>}>
              {(booking) => <BookingCard booking={booking} refetch={refetch} />}
            </For>
          </div>
        </Match>
      </Switch>
    </div>
  );
};

export default BookingHistoryList;
