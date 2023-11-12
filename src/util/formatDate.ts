import { DATE_FORMAT } from "constant/stringConstant";

export const formatDate = (date: Date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  if (isToday(date)) {
    return DATE_FORMAT.TODAY;
  }

  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${month.substring(0, 3)} ${day < 10 ? "0" + day : day}`; // 월의 이름을 약어로 변환하고, 일이 한 자리수일 경우 앞에 0을 붙여줍니다
};
