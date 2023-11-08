import Header from "components/common/Header";
import ReservationCard from "components/domain/ReservationCard";
import { MockUserData } from "constant/mockData";
import { HEADER_TYPE } from "constant/stringConstant";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SLayout from "styles/SLayout";
import { UserInfo } from "types/userType";
const ReservationList = () => {
  const [userInfoArray, setUserInfoArray] = useState<UserInfo[]>([]);

  useEffect(() => {
    // 로컬 스토리지에서 데이터 가져오기
    const storedData = localStorage.getItem("userInfo");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserInfoArray(parsedData);
    }
  }, []);
  return (
    <SGrayLayout>
      <Header pageType={HEADER_TYPE.LIST_PAGE} />
      <SCardLayout>
        {userInfoArray.map((info) => {
          return <ReservationCard key={info.id} userInfo={info} />;
        })}
      </SCardLayout>
    </SGrayLayout>
  );
};
const SCardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 칼럼을 생성 */
  gap: 10px; /* 그리드 아이템 간 간격 설정 */
  align-items: center;
  justify-items: start; /* 아이템을 좌측으로 정렬 */
  max-height: 70vh;
  overflow-y: scroll;
  padding-left: 10px;
  box-sizing: border-box;

  width: 100%;
`;
// const SCardLayout = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   align-items: center;
//   justify-content: flex-start;
//   max-height: 70vh;
//   overflow: scroll;
//   width: 100%;
// `;
const SGrayLayout = styled(SLayout)`
  background-color: var(--bg);
`;
export default ReservationList;
