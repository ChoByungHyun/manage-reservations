import React from "react";
import styled from "styled-components";
import CalendarIcon from "assets/event_available.svg";
import PersonIcon from "assets/group.svg";
import PhoneIcon from "assets/phone.svg";
import NoteIcon from "assets/edit.svg";
import ButtonGroup from "./form/ButtonGroup";
interface Props {
  info: {
    name: string;
    phone: string;
    date: string;
    person: string;
    table: string;
    floor: string;
    note: string;
  };
  key: number;
}
const ReservationCard: React.FC<Props> = ({ info, key }) => {
  return (
    <>
      <SLayout key={key}>
        <SFlex>
          <STextAlign>
            <div>{info.name}</div>
            <SPhoneLayout>
              <img src={PhoneIcon} alt="" />
              <div>{info.phone}</div>
            </SPhoneLayout>
          </STextAlign>
        </SFlex>
        <SFlex>
          <STextAlign>
            <img src={CalendarIcon} alt="" />
            <div>{info.date}</div>
          </STextAlign>
        </SFlex>
        <SFlex>
          <STextAlign>
            <img src={PersonIcon} alt="" />

            <div>{info.person}</div>
          </STextAlign>
        </SFlex>
        <SFlex>
          <div>{info.table}</div>
          <div>{info.floor}</div>
        </SFlex>
        <SFlex>
          <STextAlign>
            <div>{info.note}</div>
            <img src={NoteIcon} alt="" />
          </STextAlign>
        </SFlex>
        <SButtonGroup>
          <ButtonGroup />
        </SButtonGroup>
      </SLayout>
    </>
  );
};

const SButtonGroup = styled.div`
  width: 100%;
`;
const STextAlign = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const SPhoneLayout = styled(STextAlign)`
  background-color: var(--gray-200);
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);

  padding: 8px 10px;
  border-radius: 20px;
`;
const SFlex = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  padding: 10px 6px;
  box-sizing: border-box;
`;
const SLayout = styled(SFlex)`
  flex-direction: column;
  gap: 3px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  width: 30%;
`;

export default ReservationCard;
