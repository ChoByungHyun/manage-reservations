import Input from "components/common/Input";
import { FORM_PLACEHOLDER } from "constant/stringConstant";
import React, { useState } from "react";
import styled from "styled-components";
import GuestCounter from "./form/GuestCounter";
import DropDown from "./form/DropDown";
import TextArea from "./form/TextArea";
import ButtonGroup from "./form/ButtonGroup";
import { MOCK_TABLE_DATA } from "constant/mockData";
import SelectDateForm from "./modal/SelectDateForm";
const CreateReservation = () => {
  const [isDateModal, setIsDateModal] = useState(false);
  function closeModal() {
    setIsDateModal(false);
  }
  return (
    <SLayout>
      {isDateModal ? <SelectDateForm onClose={closeModal} /> : <></>}

      <SUserInfo>
        <Input
          placeholder={FORM_PLACEHOLDER.NAME}
          type="text"
          label={FORM_PLACEHOLDER.NAME}
        ></Input>
        <Input
          placeholder={FORM_PLACEHOLDER.PHONE}
          type="text"
          label={FORM_PLACEHOLDER.PHONE}
        ></Input>
        <SInputLayout>
          <SInput onClick={() => setIsDateModal(true)}>
            {FORM_PLACEHOLDER.DATE}
          </SInput>
        </SInputLayout>
      </SUserInfo>
      <SReservation>
        <GuestCounter />
        <DropDown items={MOCK_TABLE_DATA} />
      </SReservation>
      <TextArea />
      <ButtonGroup onClose={closeModal} />
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
`;
const SInput = styled.div`
  display: flex;
`;
const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
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
