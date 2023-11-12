import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import TimerIcon from "assets/alarm_on.svg";
import CalendarIcon from "assets/event_available.svg";
import ButtonGroup from "../ButtonGroup";
import TimePicker from "./TimePicker";
import { BUTTON_TYPE } from "constant/stringConstant";
import Calendar from "./Calendar";
import { ReservationDate } from "types/userType";
import { TIME_CONFIG } from "constant/numberConstant";

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

  if (currentMinute < TIME_CONFIG.STANDARD_MINUTE) {
    currentMinute += TIME_CONFIG.STANDARD_MINUTE; // 현재 분이 30분 미만이면 30분을 더함
  } else {
    currentHour += 1; // 현재 분이 30분 이상이면 시간을 1시간 늘림
    currentMinute = 0; // 분은 0으로 설정
  }

  const [activeTab, setActiveTab] = useState("time");
  const [hour, setHour] = useState(
    currentHour % TIME_CONFIG.STANDARD_HOUR || TIME_CONFIG.STANDARD_HOUR
  ); // 시간 (0-11)
  const [minute, setMinute] = useState(
    Math.floor(currentMinute / TIME_CONFIG.STANDARD_MINUTE) *
      TIME_CONFIG.STANDARD_MINUTE
  ); // 분 (0-30)
  const [isPM, setIsPM] = useState(currentHour >= TIME_CONFIG.STANDARD_HOUR); // AM 또는 PM
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
      setIsPM(period === TIME_CONFIG.PM);
    }
  }, []);

  useEffect(() => {
    handleTimeChange();
  }, [hour, minute, isPM]);

  // 시간 변경 후에 handleTimeChange 호출
  const changeHour = (change: number) => {
    const newHour = (hour + change) % TIME_CONFIG.STANDARD_HOUR;
    setHour(newHour < 0 ? newHour + TIME_CONFIG.STANDARD_HOUR : newHour);
  };

  const changeMinute = (change: number) => {
    const newMinute = minute + change * TIME_CONFIG.STANDARD_MINUTE;
    if (newMinute < 0) {
      setMinute(TIME_CONFIG.STANDARD_MINUTE);
      changeHour(TIME_CONFIG.MINUS_TIME);
    } else if (newMinute >= TIME_CONFIG.STANDARD_HOUR) {
      setMinute(0);
      changeHour(TIME_CONFIG.PLUS_TIME);
    } else {
      setMinute(newMinute);
    }
  };

  const toggleAMPM = () => {
    setIsPM(!isPM);
  };

  const handleTimeChange = () => {
    // 시간 변경 시에 호출되는 함수
    const time = `${hour === 0 ? TIME_CONFIG.HOUR_CONVERT : hour}:${
      minute === 0 ? TIME_CONFIG.MINUTE_CONVERT : minute
    } ${isPM ? TIME_CONFIG.PM : TIME_CONFIG.AM}`;
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
            hour === 0 ? TIME_CONFIG.STANDARD_HOUR : hour
          }:${minute === 0 ? TIME_CONFIG.MINUTE_CONVERT : minute}:${
            isPM ? TIME_CONFIG.PM : TIME_CONFIG.AM
          }`}</SInput>
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
