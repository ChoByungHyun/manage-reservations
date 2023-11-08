import React, { useState } from "react";
import styled from "styled-components";
type Props = {
  type?: "text" | "tel" | "number" | undefined;
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
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(value !== "");
  return (
    <SInputForm>
      <label
        className={`label-floating ${
          isFocused || value !== "" ? "active" : ""
        }`}
        htmlFor={label}
      >
        {label}
      </label>
      <SInput
        id={label}
        placeholder={isFocused ? "" : placeholder}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      ></SInput>
    </SInputForm>
  );
};
const SInputForm = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  position: relative;

  label.label-floating {
    position: absolute;
    transform: translateY(-50%);
    left: 5px;
    top: 30%;
    background: white;
    padding: 0 5px;
    transition: all 0.2s;
    color: var(--gray-600);
    opacity: 0; // 처음에는 라벨이 안 보이게 설정
  }

  label.label-floating.active {
    opacity: 1; // 인풋 필드가 활성화되면 라벨이 보이게 설정
    transform: translate(0, -150%) scale(0.8);
  }
  input:focus {
  }
  /* label {
    color: var(--gray-600);
  } */
`;

const SInput = styled.input`
  padding: 16px 80px 16px 16px;
  border: 1px solid var(--gray-400);
  border-radius: 5px;
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`;

export default Input;
