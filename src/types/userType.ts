export interface UserInfo {
  id: string;
  name: string;
  phone: string;
  date: ReservationDate;
  guest: number;
  table: object;
  note: string;
}

export interface ReservationDate {
  time: string;
  date: string | null;
}
