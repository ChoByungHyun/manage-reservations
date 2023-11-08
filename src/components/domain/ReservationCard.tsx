import React from "react";
import styled from "styled-components";
import CalendarIcon from "assets/event_available.svg";
import PersonIcon from "assets/group.svg";
import PhoneIcon from "assets/phone.svg";
import NoteIcon from "assets/edit.svg";
import ButtonGroup from "./form/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "types/userType";
interface Props {
  userInfo: UserInfo;
  onDelete: (id: string) => void;
}
const ReservationCard: React.FC<Props> = ({ userInfo, onDelete }) => {
  const navigate = useNavigate();
  function handleGoEditPage(userInfo: UserInfo) {
    navigate("/edit", { state: userInfo });
  }
  return (
    <>
      <SLayout onClick={() => handleGoEditPage(userInfo)}>
        <SFlex>
          <STextAlign>
            <div>{userInfo.name}</div>
            <SPhoneLayout>
              <img src={PhoneIcon} alt="" />
              <div>{userInfo.phone}</div>
            </SPhoneLayout>
          </STextAlign>
        </SFlex>
        <SFlex>
          <STextAlign>
            <img src={CalendarIcon} alt="" />
            {/* <div>{userInfo.date.date}, </div> */}
            <div>{userInfo.date.time}</div>
          </STextAlign>
        </SFlex>
        <SFlex>
          <STextAlign>
            <img src={PersonIcon} alt="" />

            <div>{userInfo.guest}</div>
          </STextAlign>
        </SFlex>
        <SFlex>
          {/* <div>{userInfo.table}</div> */}
          {/* <div>{userInfo.floor}</div> */}
        </SFlex>
        <SFlex>
          <STextAlign>
            <div>{userInfo.note}</div>
            <img src={NoteIcon} alt="" />
          </STextAlign>
        </SFlex>
        <SButtonGroup>
          <ButtonGroup onDelete={onDelete} userId={userInfo.id} />
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
  width: 95%;
  gap: 3px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
`;

export default ReservationCard;
