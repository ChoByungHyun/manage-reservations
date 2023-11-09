import Header from "components/common/Header";
import ReservationCard from "components/domain/ReservationCard";
import { HEADER_TYPE } from "constant/stringConstant";
import { useReservation } from "hook/useReservation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SLayout from "styles/SLayout";
import { UserInfo } from "types/userType";
const ReservationList = () => {
  const { userInfoArray, handleDeleteReservation, handleSetSeatTrue } =
    useReservation();

  return (
    <SGrayLayout>
      <Header pageType={HEADER_TYPE.LIST_PAGE} />
      <SCardLayout>
        {userInfoArray.map((info) => {
          if (info.isSeat) {
            return <></>;
          }
          return (
            <ReservationCard
              key={info.id}
              userInfo={info}
              onDelete={handleDeleteReservation}
              onSeated={handleSetSeatTrue}
            />
          );
        })}
      </SCardLayout>
    </SGrayLayout>
  );
};
const SCardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  align-items: center;
  justify-items: start;
  max-height: 70vh;
  overflow-y: scroll;
  padding-left: 10px;
  box-sizing: border-box;

  width: 100%;
`;

const SGrayLayout = styled(SLayout)`
  background-color: var(--bg);
`;
export default ReservationList;
