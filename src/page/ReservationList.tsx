import Header from "components/common/Header";
import ReservationCard from "components/domain/ReservationCard";
import { MockUserData } from "constant/mockData";
import { HEADER_TYPE } from "constant/stringConstant";
import React from "react";
import styled from "styled-components";
import SLayout from "styles/SLayout";
const ReservationList = () => {
  return (
    <SGrayLayout>
      <Header pageType={HEADER_TYPE.LIST_PAGE} />
      <SCardLayout>
        {MockUserData.map((info, index) => {
          return <ReservationCard info={info} key={info.id} />;
        })}
      </SCardLayout>
    </SGrayLayout>
  );
};
const SCardLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: center;
  max-height: 70vh;
  overflow: scroll;
`;
const SGrayLayout = styled(SLayout)`
  background-color: var(--bg);
`;
export default ReservationList;
