import React from "react";
import styled, { css } from "styled-components";
import TimerIcon from "assets/alarm_on.svg";
import CalendarIcon from "assets/event_available.svg";
import ButtonGroup from "../form/ButtonGroup";
import TimePicker from "./TimePicker";
type Props = {
  onClose: () => void;
};
const SelectDateForm: React.FC<Props> = ({ onClose }) => {
  return (
    <SModalBackGround>
      <SLayout>
        <SInputForm>
          <img src={TimerIcon} alt="시계아이콘" />
          <SInput></SInput>
        </SInputForm>
        <SInputForm>
          <img src={CalendarIcon} alt="달력아이콘" />
          <SInput></SInput>
        </SInputForm>
        <div>
          <TimePicker></TimePicker>
        </div>
        <ButtonGroup onClose={onClose} />
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
  padding: 24px;
  border: 1px solid var(--gray-400);
  border-radius: 5px;
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
