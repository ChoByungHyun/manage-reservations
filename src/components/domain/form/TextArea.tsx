import { FORM_PLACEHOLDER } from "constant/stringConstant";
import React from "react";
import styled from "styled-components";
import NoteIcon from "assets/edit.svg";

const TextArea = () => {
  return (
    <SLayout>
      <STextarea placeholder={FORM_PLACEHOLDER.NOTE} />
      <SImage src={NoteIcon} alt="이미지" />
    </SLayout>
  );
};
const SLayout = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  width: 100%;
`;

const STextarea = styled.textarea`
  flex: 1;
  padding: 20px 15px;
  font-size: 16px;
  resize: none;
  border: 1px solid var(--gray-400);
  border-radius: 5px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  height: 200px;
`;

const SImage = styled.img`
  /* max-width: 24px;
  max-height: 24px; */
`;

export default TextArea;
