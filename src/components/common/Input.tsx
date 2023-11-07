import React from "react";
import styled from "styled-components";
type Props = {
  type?: "text" | undefined;
  placeholder?: string;
  label: string;
};
const Input: React.FC<Props> = ({ label, placeholder, type }) => {
  return (
    <SInputForm>
      <label htmlFor="">{label}</label>
      <SInput placeholder={placeholder} type={type}></SInput>
    </SInputForm>
  );
};
const SInputForm = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  label {
    color: var(--gray-600);
  }
`;

const SInput = styled.input`
  padding: 16px 80px 16px 16px;
  border: 1px solid var(--gray-400);
  border-radius: 5px;
`;

export default Input;
