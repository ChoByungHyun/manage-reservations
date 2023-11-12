import { TIME_CONFIG } from "constant/numberConstant";
import { UserInfo } from "types/userType";

export function sortReservationTime(reservations: UserInfo[]): UserInfo[] {
  return [...reservations].sort((a, b) => {
    const dateA = new Date(a.date.date);
    dateA.setHours(0, 0, 0, 0); // 시간, 분, 초, 밀리초를 0으로 설정
    const dateB = new Date(b.date.date);
    dateB.setHours(0, 0, 0, 0); // 시간, 분, 초, 밀리초를 0으로 설정

    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    } else {
      const [hourA, minuteA] = convertTimeToHourAndMinute(a.date.time);
      const [hourB, minuteB] = convertTimeToHourAndMinute(b.date.time);
      const timeA = hourA * 60 + minuteA;
      const timeB = hourB * 60 + minuteB;

      return timeA - timeB;
    }
  });
}

export function convertTimeToHourAndMinute(time: string): [number, number] {
  // String으로 된 1:00 PM 식의 시간 변환 함수
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
