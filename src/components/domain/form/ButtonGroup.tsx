import React from "react";
import styled, { css } from "styled-components";
import DeleteIcon from "assets/trash.svg";
type Props = {
  onClose?: () => void;
};
const ButtonGroup: React.FC<Props> = ({ onClose }) => {
  return (
    <SLayout>
      <SDeleteButton>
        <img src={DeleteIcon} alt="휴지통" onClick={onClose} />
      </SDeleteButton>
      <SConfirmButton>Save</SConfirmButton>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  /* margin-bottom: 20px; */
`;
const SDeleteButton = styled.button`
  border-radius: 8px;
  padding: 10px 20px;

  background-color: var(--gray-200);
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  img {
  }
`;
const SConfirmButton = styled.button`
  flex: 1;
  padding: 20px 30px;
  background-color: var(--primary);

  border-radius: 8px;
  color: white;
  font-size: 16px;
`;
export default ButtonGroup;