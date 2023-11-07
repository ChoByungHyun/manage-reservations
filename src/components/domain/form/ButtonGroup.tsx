import React from "react";
import styled from "styled-components";
import DeleteIcon from "assets/trash.svg";
const ButtonGroup = () => {
  return (
    <SLayout>
      <SDeleteButton>
        <img src={DeleteIcon} alt="휴지통" />
      </SDeleteButton>
      <SConfirmButton>Save</SConfirmButton>
    </SLayout>
  );
};
const SLayout = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
`;
const SDeleteButton = styled.button`
  border-radius: 8px;
  padding: 20px;

  background-color: var(--gray-200);
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  img {
  }
`;
const SConfirmButton = styled.button`
  flex: 1;
  padding: 30px;
  background-color: var(--primary);

  border-radius: 8px;
  color: white;
  font-size: 16px;
`;
export default ButtonGroup;
