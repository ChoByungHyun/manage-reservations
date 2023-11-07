import Input from "components/common/Input";
import { FORM_PLACEHOLDER } from "constant/stringConstant";
import React from "react";
import styled from "styled-components";
import GuestCounter from "./form/GuestCounter";
import DropDown from "./form/DropDown";
import TextArea from "./form/TextArea";
import ButtonGroup from "./form/ButtonGroup";
import { MOCK_TABLE_DATA } from "constant/mockData";
const CreateReservation = () => {
  return (
    <SLayout>
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
        <Input
          placeholder={FORM_PLACEHOLDER.DATE}
          type="text"
          label={FORM_PLACEHOLDER.DATE}
        ></Input>
      </SUserInfo>
      <SReservation>
        <GuestCounter />
        <DropDown items={MOCK_TABLE_DATA} />
      </SReservation>
      <TextArea />
      <ButtonGroup />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  gap: 40px;
`;

const SUserInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SReservation = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default CreateReservation;
