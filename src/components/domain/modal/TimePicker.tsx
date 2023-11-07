import React, { useState } from "react";
import styled from "styled-components";
import UpArrow from "assets/chevron-up.svg";
import DownArrow from "assets/chevron-down.svg";
const TimePicker = () => {
  const [hour, setHour] = useState(0); // 시간 (0-11)
  const [minute, setMinute] = useState(0); // 분 (0-30)
  const [isPM, setIsPM] = useState(false); // AM 또는 PM

  // 시간 증가
  const incrementHour = () => {
    setHour((hour + 1) % 12);
  };

  // 분 증가 (30분 간격)
  const incrementMinute = () => {
    if (minute === 30) {
      // 30분 단위로 변경하고 시간 업데이트
      setMinute(0);
      setHour((hour + 1) % 12);
    } else {
      setMinute(minute + 30);
    }
  };

  // AM/PM 변경
  const toggleAMPM = () => {
    setIsPM(!isPM);
  };

  return (
    <SLayout>
      <STimeArrow>
        <button onClick={incrementHour}>
          <img src={UpArrow} alt="" />
        </button>
        {hour === 0 ? "12" : hour}
        <button onClick={incrementHour}>
          <img src={DownArrow} alt="" />
        </button>
      </STimeArrow>
      <div> : </div>
      <STimeArrow>
        <button onClick={incrementMinute}>
          <img src={UpArrow} alt="" />
        </button>
        {minute === 0 ? "00" : minute}
        <button onClick={incrementMinute}>
          <img src={DownArrow} alt="" />
        </button>
      </STimeArrow>
      <STimeArrow>
        <button onClick={toggleAMPM}>
          <img src={UpArrow} alt="" />
        </button>
        {isPM ? "PM" : "AM"}
        <button onClick={toggleAMPM}>
          <img src={DownArrow} alt="" />
        </button>
      </STimeArrow>
    </SLayout>
  );
};
const SLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-size: 30px;
`;
const STimeArrow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export default TimePicker;
