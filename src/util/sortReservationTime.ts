import { TIME_CONFIG } from "constant/numberConstant";
import { UserInfo } from "types/userType";

export function sortReservationTime(reservations: UserInfo[]): UserInfo[] {
  return [...reservations].sort((a, b) => {
    const dateA = new Date(a.date.date);
    const dateB = new Date(b.date.date);

    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    } else {
      const timeA = a.date.time
        .split(":")
        .reduce(
          (acc, cur, idx) => acc + (idx === 0 ? Number(cur) * 60 : Number(cur)),
          0
        );
      const timeB = b.date.time
        .split(":")
        .reduce(
          (acc, cur, idx) => acc + (idx === 0 ? Number(cur) * 60 : Number(cur)),
          0
        );

      return timeA - timeB;
    }
  });
}

export function convertTimeToHourAndMinute(time: string): [number, number] {
  const [hourMin, period] = time.split(" ");
  const [hour, minute] = hourMin.split(":").map(Number);

  let hourIn24 = hour;

  // PM이면서 시간이 12가 아닌 경우, 시간에 12를 더함
  if (
    period.toUpperCase() === TIME_CONFIG.PM &&
    hour !== TIME_CONFIG.STANDARD_HOUR
  ) {
    hourIn24 += 12;
  }

  // AM이면서 시간이 12인 경우, 시간을 0으로 설정
  if (
    period.toUpperCase() === TIME_CONFIG.AM &&
    hour === TIME_CONFIG.STANDARD_HOUR
  ) {
    hourIn24 = 0;
  }

  return [hourIn24, minute];
}
