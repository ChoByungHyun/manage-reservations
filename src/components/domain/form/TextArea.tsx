import { FORM_PLACEHOLDER } from "constant/stringConstant";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
type Props = {
  value: string;
  onChange: (value: string) => void;
};
const TextArea: React.FC<Props> = ({ value, onChange }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    const newText = divRef.current?.innerText || "";
    onChange(newText);
  };

  useEffect(() => {
    if (divRef.current) {
      if (divRef.current.innerText !== value) {
        divRef.current.innerText = value;
      }
    }
  }, [value]);

  return (
    <SLayout>
      <STextarea
        ref={divRef}
        contentEditable
        data-placeholder={FORM_PLACEHOLDER.NOTE}
        onInput={handleInput}
      />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  width: 100%;
`;

const STextarea = styled.div`
  flex: 1;
  padding: 20px 15px;
  font-size: 16px;
  resize: none;
  border: 1px solid var(--gray-400);
  border-radius: 5px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  height: 200px;
  width: 100%;
  overflow: auto;
  position: relative;

  &[contentEditable="true"]:empty::before {
    content: attr(data-placeholder);
    color: var(--gray-400);
    font-size: 14px;
  }
  &:focus {
    border-color: var(--primary);
    outline: none;
  }

  &::after {
    content: "";
    background-image: url("../../../assets/edit.svg");
    background-repeat: no-repeat;
    background-size: contain;
    height: 20px;
    width: 20px;
    margin-left: 5px;
    position: absolute;
  }
`;

export default TextArea;
