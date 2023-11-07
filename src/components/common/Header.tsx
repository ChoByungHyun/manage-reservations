import React from "react";
import styled from "styled-components";
import BackButtonIcon from "assets/keyboard_backspace.svg";
import AddButtonIcon from "assets/add.svg";
import CloseButtonIcon from "assets/close.svg";
import { HEADER_TITLE, HEADER_TYPE } from "constant/stringConstant";

type Props = {
  pageType: string;
};
const Header = ({ pageType }: Props) => {
  return (
    <SLayout>
      {pageType === HEADER_TYPE.LIST_PAGE ? (
        <>
          <SBackButton>
            <SImgButton src={AddButtonIcon} aria-label="뒤로가기"></SImgButton>
            <SCreateButton>{HEADER_TITLE.CREATE_PAGE}</SCreateButton>
          </SBackButton>

          <STitle aria-label="폼 제목">{HEADER_TITLE.LIST_PAGE}</STitle>
        </>
      ) : pageType === HEADER_TYPE.CREATE_PAGE ? (
        <>
          <SBackButton>
            <SImgButton src={BackButtonIcon} aria-label="뒤로가기"></SImgButton>
          </SBackButton>
          <STitle aria-label="폼 제목">{HEADER_TITLE.CREATE_PAGE}</STitle>
        </>
      ) : (
        <>
          <SBackButton>
            <SImgButton src={BackButtonIcon} aria-label="뒤로가기"></SImgButton>
          </SBackButton>

          <STitle aria-label="폼 제목">{HEADER_TITLE.EDIT_PAGE}</STitle>
        </>
      )}
      <SImgButton src={CloseButtonIcon} alt="close" />
    </SLayout>
  );
};
const SCreateButton = styled.p`
  color: var(--primary);
`;
const SBackButton = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 8px;
  box-shadow: 2px 3px 5px 0px rgba(0, 0, 0, 0.1);
  background-color: var(--gray-200);
`;

const STitle = styled.h1`
  font-size: 24px;
`;

const SLayout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  margin: 0 auto;
  box-sizing: border-box;
  align-items: center;
  padding: 0 20px;
  margin-top: 20px;
  margin-bottom: 15px;

  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const SImgButton = styled.img`
  cursor: pointer;
  width: 30px;
  height: 30px;
  vertical-align: bottom;
`;

export default Header;
