import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import TimerIcon from "assets/alarm_on.svg";
import CalendarIcon from "assets/event_available.svg";
import ButtonGroup from "../ButtonGroup";
import TimePicker from "./TimePicker";
import { BUTTON_TYPE } from "constant/stringConstant";
import Calendar from "./Calendar";

import "react-datepicker/dist/react-datepicker.css"; // 스타일 시트를 임포트 합니다
import { ReservationDate } from "types/userType";
import { formatDate } from "util/formatDate";

type Props = {
  onClose: () => void;
  onSave: (date: ReservationDate) => void;
  initialTime?: string;
  initialDate: Date;
};
const SelectDateForm: React.FC<Props> = ({
  onClose,
  onSave,
  initialTime,
  initialDate,
}) => {
  let now = new Date(); // 현재 시간을 가져옴
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();

  if (currentMinute < 30) {
    currentMinute += 30; // 현재 분이 30분 미만이면 30분을 더함
  } else {
    currentHour += 1; // 현재 분이 30분 이상이면 시간을 1시간 늘림
    currentMinute = 0; // 분은 0으로 설정
  }

  const [activeTab, setActiveTab] = useState("time");
  // const [selectedDate, setSelectedDate] = useState<Date>(now); // 선택된 날짜를 관리하는 상태
  const [hour, setHour] = useState(currentHour % 12 || 12); // 시간 (0-11)
  const [minute, setMinute] = useState(Math.floor(currentMinute / 30) * 30); // 분 (0-30)
  const [isPM, setIsPM] = useState(currentHour >= 12); // AM 또는 PM
  const [selectedTime, setSelectedTime] = useState<string>(""); // 선택된 시간을 관리하는 상태
  const [selectedDate, setSelectedDate] = useState<Date>(
    initialDate ? new Date(initialDate) : new Date()
  );

  useEffect(() => {
    if (initialTime) {
      const [time, period] = initialTime.split(" ");
      const [initialHour, initialMinute] = time.split(":").map(Number);

      setHour(initialHour);
      setMinute(initialMinute);
      setIsPM(period === "PM");
    }
  }, []);

  useEffect(() => {
    handleTimeChange();
  }, [hour, minute, isPM]);

  // 시간 변경 후에 handleTimeChange 호출
  const changeHour = (change: number) => {
    const newHour = (hour + change) % 12;
    setHour(newHour < 0 ? newHour + 12 : newHour);
  };

  const changeMinute = (change: number) => {
    const newMinute = minute + change * 30;
    if (newMinute < 0) {
      setMinute(30);
      changeHour(-1);
    } else if (newMinute >= 60) {
      setMinute(0);
      changeHour(1);
    } else {
      setMinute(newMinute);
    }
  };

  const toggleAMPM = () => {
    setIsPM(!isPM);
  };

  const handleTimeChange = () => {
    // 시간 변경 시에 호출되는 함수
    const time = `${hour === 0 ? 12 : hour}:${minute === 0 ? "00" : minute} ${
      isPM ? "PM" : "AM"
    }`;
    setSelectedTime(time);
  };

  const handleChange = (date: Date) => {
    setSelectedDate(date);
  };
  const handleSave = () => {
    const date = {
      date: selectedDate,
      time: selectedTime,
    };
    onSave(date);
  };

  return (
    <SModalBackGround>
      <SLayout>
        <SInputForm onClick={() => setActiveTab("time")}>
          <img src={TimerIcon} alt="시계아이콘" />
          <SInput className={activeTab === "time" ? "active-tab" : ""}>{`${
            hour === 0 ? 12 : hour
          }:${minute === 0 ? "00" : minute}:${isPM ? "PM" : "AM"}`}</SInput>
        </SInputForm>
        <SInputForm onClick={() => setActiveTab("calendar")}>
          <img src={CalendarIcon} alt="달력아이콘" />
          <Calendar
            initialDate={initialDate}
            activeTab={activeTab}
            onSelectDate={handleChange}
          />
        </SInputForm>
        <div>
          {activeTab === "time" && (
            <TimePicker
              hour={hour}
              minute={minute}
              isPM={isPM}
              changeHour={changeHour}
              changeMinute={changeMinute}
              toggleAMPM={toggleAMPM}
            />
          )}
        </div>
        <ButtonGroup
          onSave={handleSave}
          onClose={onClose}
          buttonType={BUTTON_TYPE.SAVE_DELETE}
        />
      </SLayout>
    </SModalBackGround>
  );
};

const SModalStyle = css`
  width: 327px;
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 32px 24px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  text-align: center;
  top: 20%;
`;

const SModalBackGround = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 40;
`;

const SInput = styled.div`
  flex: 1;
  padding: 20px;
  border: 1px solid var(--gray-400);
  border-radius: 5px;
  text-align: left;
  cursor: pointer;
  &.active-tab {
    border: 1px solid var(--primary);
  }
`;

const SLayout = styled.div`
  ${SModalStyle}
`;
const SInputForm = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    min-width: 30px;
    min-height: 30px;
  }
`;

export default SelectDateForm;
