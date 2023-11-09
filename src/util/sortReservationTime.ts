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
