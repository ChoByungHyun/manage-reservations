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
        {(label === "Name" || label === "Phone") && ( // 조건부 렌더링
          <SLabelRequired>*</SLabelRequired> // 다른 스타일을 적용한 아스테리스크
        )}
      </label>
      <SPlaceholder $isFocused={isFocused || value !== ""}>
        {placeholder}
        {(label === "Name" || label === "Phone") && (
          <SLabelRequired>*</SLabelRequired>
        )}
      </SPlaceholder>
      <SInput
        id={label}
        // placeholder={isFocused ? "" : placeholder}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      ></SInput>
    </SInputForm>
  );
};
const SPlaceholder = styled.div<{ $isFocused: boolean }>`
  position: absolute;
  left: 15px;

  font-size: 12px;
  display: flex;
  gap: 2px;
  color: var(--gray-600);
  top: ${({ $isFocused }) => ($isFocused ? "-10%" : "50%")};
  transform: ${({ $isFocused }) =>
    $isFocused ? "translate(0, -150%) scale(0.8)" : "translateY(-50%)"};
  transition: all 0.2s;
  opacity: ${({ $isFocused }) => ($isFocused ? "0" : "1")};
  display: ${({ $isFocused }) => ($isFocused ? "none" : "flex")};
`;

const SLabelRequired = styled.span`
  color: var(--primary);
`;
const SInputForm = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  position: relative;

  label.label-floating {
    position: absolute;
    transform: translateY(-50%);
    left: 5px;
    top: 30%;
    background: white;
    padding: 0 5px;
    transition: all 0.3s ease;
    color: var(--gray-600);
    opacity: 0; // 처음에는 라벨이 안 보이게 설정
    display: none;
  }

  label.label-floating.active {
    opacity: 1; // 인풋 필드가 활성화되면 라벨이 보이게 설정
    display: block;

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
