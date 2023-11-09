import React from "react";
import styled from "styled-components";
import BackButtonIcon from "assets/keyboard_backspace.svg";
import { useNavigate } from "react-router-dom";
import AddButtonIcon from "assets/add.svg";
import CloseButtonIcon from "assets/close.svg";
import { HEADER_TITLE, HEADER_TYPE } from "constant/stringConstant";

type Props = {
  pageType: string;
  validCardCount: number;
};
const Header = ({ pageType, validCardCount }: Props) => {
  const navigate = useNavigate();
  function navigateCreatePage() {
    navigate("/create");
  }
  function navigateBack() {
    navigate(-1);
  }
  return (
    <SLayout>
      {pageType === HEADER_TYPE.LIST_PAGE ? (
        <>
          <SBackButton onClick={navigateCreatePage}>
            <SImgButton src={AddButtonIcon} aria-label="예약생성"></SImgButton>
            <SCreateButton>{HEADER_TITLE.CREATE_PAGE}</SCreateButton>
          </SBackButton>
          <SListTitle aria-label="폼 제목">
            {HEADER_TITLE.LIST_PAGE}
            {validCardCount > 0 && (
              <SListCountLayout>
                <SListCount>{validCardCount}</SListCount>
              </SListCountLayout>
            )}
          </SListTitle>
        </>
      ) : pageType === HEADER_TYPE.CREATE_PAGE ? (
        <>
          <SBackButton onClick={navigateBack}>
            <SImgButton src={BackButtonIcon} aria-label="뒤로가기"></SImgButton>
          </SBackButton>
          <STitle aria-label="폼 제목">{HEADER_TITLE.CREATE_PAGE}</STitle>
        </>
      ) : (
        <>
          <SBackButton onClick={navigateBack}>
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
  cursor: pointer;
`;

const STitle = styled.h1`
  font-size: 24px;
`;

const SListTitle = styled(STitle)`
  position: relative;
  padding-right: 120px;
  display: flex;
  /* justify-content: center;
  align-items: center; */
  gap: 7px;
`;
const SListCountLayout = styled.div`
  position: absolute;
  left: 53%;
  top: -1px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  padding: 5px;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SListCount = styled.p`
  font-size: 13px;
  color: var(--white);
  margin: 0 auto;
`;

const SLayout = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
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
