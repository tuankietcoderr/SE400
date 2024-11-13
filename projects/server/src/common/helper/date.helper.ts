import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';
import { ROOT_TIME_ZONE, TEST_TIME_ZONE } from '../constants';

@Injectable()
export class DateHelperService {
  private readonly SERVER_TIME_ZONE = ROOT_TIME_ZONE;
  private readonly TEST_TIME_ZONE = TEST_TIME_ZONE;

  getNextDrawDate() {
    // Lấy thời gian hiện tại theo múi giờ PT (Pacific Time)
    const now = moment.tz(this.SERVER_TIME_ZONE);

    // Đặt giờ xổ số là 19:35 (7:35 PM) PT
    const lotteryTime = now.clone().set({ hour: 19, minute: 35, second: 0, millisecond: 0 });

    // Lấy ngày hiện tại (0: Sunday, 1: Monday, ..., 6: Saturday)
    const currentDay = now.day();

    // Xác định ngày xổ số tiếp theo là thứ Ba (2) hoặc thứ Sáu (5)
    if (currentDay === 2 || currentDay === 5) {
      // Nếu hiện tại là thứ Ba hoặc thứ Sáu, kiểm tra xem có qua 19:35 chưa
      if (now.isBefore(lotteryTime)) {
        return lotteryTime.utc().toDate(); // Ngày xổ số là hôm nay nếu chưa qua 19:35
      } else {
        // Nếu đã qua 19:35, lấy ngày xổ số tiếp theo
        currentDay === 2
          ? lotteryTime.add(3, 'days') // Từ thứ Ba -> thứ Sáu
          : lotteryTime.add(4, 'days'); // Từ thứ Sáu -> thứ Ba
      }
    } else {
      // Nếu không phải thứ Ba hoặc thứ Sáu, tính ngày xổ số tiếp theo
      const daysUntilNextLottery =
        currentDay < 2
          ? 2 - currentDay // Từ Chủ Nhật -> Thứ Ba
          : currentDay < 5
            ? 5 - currentDay // Từ thứ Tư -> Thứ Sáu
            : 9 - currentDay; // Từ thứ Bảy -> Thứ Ba tuần sau

      // Trả về ngày xổ số tiếp theo theo chuẩn UTC
      lotteryTime.add(daysUntilNextLottery, 'days');
    }

    return lotteryTime.utc().toDate();
  }

  getNow() {
    return moment().tz(this.SERVER_TIME_ZONE).toDate();
  }

  getDate(date: string | Date) {
    const targetTime = moment(date)
      .tz(this.SERVER_TIME_ZONE)
      .set({
        hour: 19,
        minute: 35,
        second: 0,
        millisecond: 0
      })
      .utc();
    return targetTime.toDate();
  }

  getSystemPredictionDate(date: string | Date) {
    const targetTime = moment(date)
      .tz(this.SERVER_TIME_ZONE)
      .set({
        hour: 19,
        minute: 35,
        second: 0,
        millisecond: 0
      })
      .utc();
    return targetTime.toDate();
  }

  plusDateWithMinutes(date: Date, minutes: number) {
    return moment(date).tz(this.TEST_TIME_ZONE).add(minutes, 'minutes').toDate();
  }

  formatDate(date: Date, format: string) {
    return moment(date).tz(this.SERVER_TIME_ZONE).format(format);
  }

  getWeekNumber(date: Date) {
    return moment(date).tz(this.SERVER_TIME_ZONE).week();
  }
}
