import React, { useState } from "react";
import styled from "styled-components";
import UpArrow from "assets/chevron-up.svg";
import DownArrow from "assets/chevron-down.svg";
import { TIME_CONFIG } from "constant/stringConstant";
type Props = {
  hour: number;
  minute: number;
  isPM: boolean;
  changeHour: (change: number) => void;
  changeMinute: (change: number) => void;
  toggleAMPM: () => void;
};

const TimePicker: React.FC<Props> = ({
  hour,
  minute,
  isPM,
  changeHour,
  changeMinute,
  toggleAMPM,
}) => {
  return (
    <SLayout>
      <STimeArrow>
        <button onClick={() => changeHour(1)}>
          <img src={UpArrow} alt="" />
        </button>
        {hour === 0 ? TIME_CONFIG.HOUR_CONVERT : hour}
        <button onClick={() => changeHour(-1)}>
          <img src={DownArrow} alt="" />
        </button>
      </STimeArrow>
      <div> : </div>
      <STimeArrow>
        <button onClick={() => changeMinute(1)}>
          <img src={UpArrow} alt="" />
        </button>
        {minute === 0 ? TIME_CONFIG.MINUTE_CONVERT : minute}
        <button onClick={() => changeMinute(-1)}>
          <img src={DownArrow} alt="" />
        </button>
      </STimeArrow>
      <STimeArrow>
        <button onClick={toggleAMPM}>
          <img src={UpArrow} alt="" />
        </button>
        {isPM ? TIME_CONFIG.PM : TIME_CONFIG.AM}
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
