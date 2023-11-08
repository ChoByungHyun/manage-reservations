import Input from "components/common/Input";
import { BUTTON_TYPE, FORM_PLACEHOLDER } from "constant/stringConstant";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GuestCounter from "./form/GuestCounter";
import DropDown from "./form/DropDown";
import TextArea from "./form/TextArea";
import ButtonGroup from "./form/ButtonGroup";
import { MOCK_TABLE_DATA } from "constant/mockData";
import SelectDateForm from "./modal/SelectDateForm";
import CalendarIcon from "assets/event_available.svg";
import { v4 as uuidv4 } from "uuid";
import { UserInfo } from "types/userType";

interface Props {}
const CreateReservation: React.FC<Props> = ({}) => {
  const [isDateModal, setIsDateModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [guest, setGuest] = useState(1);
  const [table, setTable] = useState({});
  const [note, setNote] = useState("");
  const [userInfoArray, setUserInfoArray] = useState<UserInfo[]>([]);

  useEffect(() => {
    // 로컬 스토리지에서 데이터 가져오기
    const storedData = localStorage.getItem("userInfo");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserInfoArray(parsedData);
    }
  }, []);

  useEffect(() => {
    //userInfoArray 변경 시 로컬 스토리지에 저장
    localStorage.setItem("userInfo", JSON.stringify(userInfoArray));
  }, [userInfoArray]);

  function closeModal() {
    //모달 닫는 함수
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

  function saveDate() {}

  function handleUpdateNote(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setNote(event.target.value);
  }

  function storageSaveUserInfo() {
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
    };

    setUserInfoArray((prev) => [...prev, userInfoData]);
  }

  return (
    <SLayout>
      {isDateModal ? <SelectDateForm onClose={closeModal} /> : <></>}
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
          type="text"
          label={FORM_PLACEHOLDER.PHONE}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></Input>
        <SInputLayout onClick={() => setIsDateModal(true)}>
          <SInput>
            <div>
              <img src={CalendarIcon} alt="달력 아이콘" />
              {FORM_PLACEHOLDER.DATE}
            </div>
          </SInput>
        </SInputLayout>
      </SUserInfo>
      <SReservation>
        <GuestCounter onCount={handleGuestCounter} guest={guest} />
        <DropDown items={MOCK_TABLE_DATA} />
      </SReservation>
      <TextArea value={note} onChange={handleUpdateNote} />
      <ButtonGroup
        onClose={closeModal}
        buttonType={BUTTON_TYPE.SAVE}
        onSave={storageSaveUserInfo}
      />
    </SLayout>
  );
};
const SInputLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 40px;
  border: 1px solid var(--gray-400);
  border-radius: 5px;
  align-self: center;
  flex: 1;
  cursor: pointer;
`;
const SInput = styled.div`
  display: flex;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 14px;
    color: var(--gray-600);
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
