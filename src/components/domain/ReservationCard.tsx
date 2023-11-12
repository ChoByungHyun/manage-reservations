import React from "react";
import styled from "styled-components";
import CalendarIcon from "assets/event_available.svg";
import PersonIcon from "assets/group.svg";
import PhoneIcon from "assets/phone.svg";
import NoteIcon from "assets/edit.svg";
import ButtonGroup from "./form/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "types/userType";
import TableDataRender from "components/domain/form/table/TableDataRender";
import { TABLE_INFO } from "constant/stringConstant";
import { formatDate } from "util/formatDate";
import { PATH } from "constant/navigateConstant";
interface Props {
  userInfo: UserInfo;
  onDelete: (id: string) => void;
  onSeated: (id: string) => void;
}
const ReservationCard: React.FC<Props> = ({ userInfo, onDelete, onSeated }) => {
  const navigate = useNavigate();

  function handleGoEditPage(userInfo: UserInfo) {
    navigate(PATH.EDIT, { state: userInfo });
  }

  const userDate = formatDate(new Date(userInfo.date.date));
  return (
    <>
      <SLayout onClick={() => handleGoEditPage(userInfo)}>
        <SFlex>
          <STextAlign>
            <SUserName>{userInfo.name}</SUserName>
            <SPhoneLayout>
              <img src={PhoneIcon} alt="" />
              <div>{userInfo.phone}</div>
            </SPhoneLayout>
          </STextAlign>
        </SFlex>
        <SFlex>
          <STextAlign>
            <img src={CalendarIcon} alt="" />
            <SDateText>{userDate}, </SDateText>
            <SDateText>{userInfo.date.time}</SDateText>
          </STextAlign>
        </SFlex>
        <SFlex>
          <STextAlign>
            <img src={PersonIcon} alt="" />
            <SGuestCount>{userInfo.guest}</SGuestCount>
          </STextAlign>
        </SFlex>
        <SFlex>
          <STableLayout>
            {userInfo.table.length === 0 ? (
              <SNoTable>{TABLE_INFO.NO_TABLE}</SNoTable>
            ) : (
              <STableInfoLayout>
                {TABLE_INFO.RESERVED}
                <STableDataInfo>
                  {TableDataRender(userInfo.table)}
                </STableDataInfo>
              </STableInfoLayout>
            )}
          </STableLayout>
        </SFlex>
        <SFlex>
          <SNoteLayout>
            {userInfo.note.length !== 0 && (
              <>
                <SNote>{userInfo.note}</SNote>
                <img src={NoteIcon} alt="" />
              </>
            )}
          </SNoteLayout>
        </SFlex>
        <SButtonGroup>
          <ButtonGroup
            onSeated={onSeated}
            onDelete={onDelete}
            userId={userInfo.id}
          />
        </SButtonGroup>
      </SLayout>
    </>
  );
};

const STableInfoLayout = styled.div`
  display: flex;
  gap: 5px;
`;
const STableDataInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: flex-start;
  align-items: flex-start;
`;
const SUserName = styled.p`
  font-size: 18px;
`;
const SDateText = styled.p`
  color: var(--gray-1000);
`;
const SGuestCount = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: var(--gray-1000);
`;
const SNoTable = styled.div`
  color: var(--gray-400);
  font-style: italic;
`;
const STableLayout = styled.div`
  display: flex;
  gap: 5px;
  color: var(--gray-800);
  align-items: flex-start;
  height: 40px;
`;
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

  font-size: 14px;
  color: var(--gray-800);

  padding: 6px 10px;
  border-radius: 20px;

  margin-left: 5px;
`;
const SFlex = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  padding: 8px 6px;
  box-sizing: border-box;
`;
const SLayout = styled(SFlex)`
  flex-direction: column;
  width: 95%;
  gap: 3px;
  margin-bottom: 12px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
`;
const SNote = styled.div`
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 말줄임 적용 */
`;
const SNoteLayout = styled(STextAlign)`
  height: 15px;
  margin-bottom: 5px;
`;

export default ReservationCard;
