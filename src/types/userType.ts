export interface UserInfo {
  id: string;
  name: string;
  phone: string;
  date: ReservationDate;
  guest: number;
  table: TableInfo[];
  note: string;
  isSeat: boolean;
}

export interface ReservationDate {
  time: string;
  date: string | null;
}
export interface TableInfo {
  table: number;
  floor: number;
  reserved: boolean;
}
