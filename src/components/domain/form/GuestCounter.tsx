import React from "react";
import styled from "styled-components";
import plusIcon from "assets/math-plus.svg";
import minusIcon from "assets/math-minus.svg";
import { FORM_PLACEHOLDER } from "constant/stringConstant";
type Props = {
  onCount: (value: number) => void;
  guest: number;
};
const GuestCounter: React.FC<Props> = ({ onCount, guest }) => {
  return (
    <SLayout>
      <div>{FORM_PLACEHOLDER.GUEST}</div>
      <SIconLayout onClick={() => onCount(-1)}>
        <img src={minusIcon} alt="마이너스 아이콘" />
      </SIconLayout>
      <p>{guest}</p>
      <SIconLayout onClick={() => onCount(1)}>
        <img src={plusIcon} alt="플러스 아이콘" />
      </SIconLayout>
    </SLayout>
  );
};
const SLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  p {
    font-size: 20px;
    font-weight: bold;
  }
  div:nth-child(1) {
    color: var(--gray-800);
  }
`;
const SIconLayout = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid var(--gray-400);
  border-radius: 5px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  background-color: var(--gray-200);
  padding: 5px;
`;
export default GuestCounter;
