import React from "react";
import styled from "styled-components";
type Props = {
  type?: "text" | "button" | undefined;
  placeholder?: string;
  label: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
};
const Input: React.FC<Props> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
}) => {
  return (
    <SInputForm>
      <label>{label}</label>
      <SInput
        id={label}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      ></SInput>
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
