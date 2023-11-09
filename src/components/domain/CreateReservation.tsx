import Input from "components/common/Input";
import { BUTTON_TYPE, FORM_PLACEHOLDER } from "constant/stringConstant";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GuestCounter from "./form/GuestCounter";
import DropDown from "./form/table/DropDown";
import TextArea from "./form/TextArea";
import ButtonGroup from "./form/ButtonGroup";
import { MOCK_TABLE_DATA } from "constant/mockData";
import SelectDateForm from "./form/modal/SelectDateForm";
import CalendarIcon from "assets/event_available.svg";
import { v4 as uuidv4 } from "uuid";
import { ReservationDate, TableInfo, UserInfo } from "types/userType";
import { useNavigate } from "react-router-dom";
import { formatDate } from "util/formatDate";
interface Props {
  userInfo?: UserInfo;
}

const CreateReservation: React.FC<Props> = ({ userInfo }) => {
  const [isDateModal, setIsDateModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<ReservationDate>({
    time: "",
    date: new Date(),
  });
  const [guest, setGuest] = useState(1);
  const [table, setTable] = useState<TableInfo[]>([]);
  const [note, setNote] = useState("");
  const [isSeat, setIsSeat] = useState(false);
  const [userInfoArray, setUserInfoArray] = useState<UserInfo[]>([]);
  const [isInputValid, setIsInputValid] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    // 로컬 스토리지에서 데이터 가져오기
    const storedData = localStorage.getItem("userInfo");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserInfoArray(parsedData);
    }
  }, []);

  useEffect(() => {
    if (name && phone && date.date && date.time) {
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
    }
  }, [name, phone, date]);

  useEffect(() => {
    if (userInfo) {
      //props로 userInfo가 있을 경우(편집)
      setIsEditMode(true);
      setUserId(userInfo.id);
      setName(userInfo.name);
      setPhone(userInfo.phone);
      setDate(userInfo.date);
      setGuest(userInfo.guest);
      setTable(userInfo.table);
      setNote(userInfo.note);
      setIsSeat(userInfo.isSeat);
    }
  }, [userInfo]);

  function closeModal() {
    setDate({
      time: "",
      date: new Date(),
    });

    setIsDateModal(false);
  }

  function handleGuestCounter(value: number) {
    if (guest === 1 && value === -1) {
      return;
    }
    if (guest === 99 && value === 1) {
      return;
    }
    setGuest((prevGuest) => prevGuest + value);
  }

  function saveDate(date: ReservationDate) {
    console.log("🚀 ~ file: CreateReservation.tsx:92 ~ saveDate ~ date:", date);
    setDate(date);
    setIsDateModal(false);
  }

  function handleUpdateNote(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setNote(event.target.value);
  }

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value.replace(/\D/g, ""); // 숫자가 아닌 것들을 제거
    if (value.length > 11) {
      value = value.slice(0, 11); // 입력값을 11자리로 제한
    }

    // 숫자를 그룹으로 나누어 각 그룹 사이에 하이픈을 추가
    if (value.length > 8) {
      value = value.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
    } else if (value.length > 4) {
      value = value.replace(/(\d{3})(\d+)/, "$1-$2");
    }

    setPhone(value);
  };

  async function storageSaveUserInfo() {
    //Save Button 눌렀을 때 객체형태로 Array저장하는 함수
    const uniqueID = uuidv4();

    const userInfoData: UserInfo = {
      id: uniqueID,
      name,
      phone,
      date,
      guest,
      table,
      note,
      isSeat,
    };
    setUserInfoArray((prev) => {
      let updatedArray;
      if (isEditMode) {
        //편집일 경우
        updatedArray = prev.map((userInfo) => {
          if (userInfo.id === userId) {
            return { ...userInfo, ...userInfoData };
          }
          return userInfo;
        });
      } else {
        updatedArray = [...prev, userInfoData];
      }

      localStorage.setItem("userInfo", JSON.stringify(updatedArray));
      return updatedArray;
    });
    // 상태 || 스토리지 업데이트 전 navigate 이슈로 추가
    await new Promise((resolve) => setTimeout(resolve, 0));
    navigate("/");
  }

  const handleTableUpdate = (selectedItems: TableInfo[]) => {
    setTable(selectedItems);
  };

  async function handleDeleteReservation(id: string) {
    //예약카드 삭제하는 함수
    setUserInfoArray((prev) => prev.filter((userInfo) => userInfo.id !== id));
    await storageSaveUserInfo();
  }

  return (
    <SLayout>
      {isDateModal ? (
        <SelectDateForm
          initialDate={date.date}
          initialTime={date.time}
          onClose={closeModal}
          onSave={saveDate}
        />
      ) : (
        <></>
      )}
      <SUserInfo>
        <Input
          placeholder={FORM_PLACEHOLDER.NAME}
          type="text"
          label={FORM_PLACEHOLDER.NAME}
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
        <Input
          placeholder={FORM_PLACEHOLDER.PHONE}
          type="tel"
          label={FORM_PLACEHOLDER.PHONE}
          value={phone}
          onChange={(e) => handlePhoneInput(e)}
        ></Input>
        <SInputLayout onClick={() => setIsDateModal(true)}>
          <SInput>
            <div>
              <img src={CalendarIcon} alt="달력 아이콘" />
              {date.date === null || date.time === "" ? (
                FORM_PLACEHOLDER.DATE
              ) : (
                <>
                  {formatDate(new Date(date.date))}
                  {", "}
                  {date.time}
                </>
              )}
            </div>
          </SInput>
        </SInputLayout>
      </SUserInfo>
      <SReservation>
        <GuestCounter onCount={handleGuestCounter} guest={guest} />
        <DropDown
          items={MOCK_TABLE_DATA}
          table={table}
          onTableUpdate={handleTableUpdate}
        />
      </SReservation>
      <TextArea value={note} onChange={handleUpdateNote} />
      <ButtonGroup
        onClose={closeModal}
        buttonType={isEditMode ? BUTTON_TYPE.SEATED : BUTTON_TYPE.ONLY_SAVE}
        onSave={storageSaveUserInfo}
        userId={userInfo?.id}
        isEditMode={isEditMode}
        onDelete={handleDeleteReservation}
        disabled={!isInputValid}
      />
    </SLayout>
  );
};
const SInputLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* height: 40px; */
  /* border: 1px solid var(--gray-400); */
  border-radius: 5px;
  /* align-self: center; */
  flex: 1;
  cursor: pointer;
  background-color: var(--gray-200);
  box-shadow: var(--box-shadow);
`;
const SInput = styled.div`
  display: flex;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 14px;
    color: var(--black);
  }
`;
const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  padding-bottom: 20px;
  gap: 40px;
`;

const SUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const SReservation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default CreateReservation;
