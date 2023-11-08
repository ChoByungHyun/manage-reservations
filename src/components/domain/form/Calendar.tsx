import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 스타일 시트를 임포트 합니다
import styled from "styled-components";
type Props = {
  onSelectDate: (date: Date) => void;
  activeTab: string;
};

const Calendar: React.FC<Props> = ({ onSelectDate, activeTab }) => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // 현재 날짜로 초기화합니다

  const handleChange = (date: Date) => {
    setSelectedDate(date);
    onSelectDate(date); // 선택된 날짜를 상위 컴포넌트에 전달합니다
  };

  return (
    <SCalendarLayout className={activeTab === "calendar" ? "active-tab" : ""}>
      <DatePicker
        className="datepicker"
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="MMMM dd"
      />
    </SCalendarLayout>
  );
};
const SCalendarLayout = styled.div`
  display: flex;
  flex: 1;
  cursor: pointer;

  &.active-tab {
    border: 1px solid var(--primary);
    border-radius: 5px;
  }
  .react-datepicker-wrapper {
    display: flex;
    flex: 1;
  }
  .react-datepicker__input-container {
    display: flex;
    flex: 1;
  }
  .datepicker {
    flex: 1;
    width: 100%;
    padding: 20px;
    border-radius: 5px;
    text-align: left;
    border-radius: 5px;
    border: 1px solid var(--gray-400);
    outline: none;
    cursor: pointer;
  }
`;
export default Calendar;
