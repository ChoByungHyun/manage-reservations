import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { DATE_FORMAT } from "constant/stringConstant";
type Props = {
  onSelectDate: (date: Date) => void;
  activeTab: string;
  initialDate: Date;
};

const Calendar: React.FC<Props> = ({
  onSelectDate,
  activeTab,
  initialDate,
}) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date(initialDate) || new Date()
  );

  const handleChange = (date: Date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  return (
    <SCalendarLayout className={activeTab === "calendar" ? "active-tab" : ""}>
      <DatePicker
        className="datepicker"
        startDate={initialDate}
        minDate={new Date()}
        selected={selectedDate}
        onChange={handleChange}
        dateFormat={DATE_FORMAT.CALENDAR_FORMAT}
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
