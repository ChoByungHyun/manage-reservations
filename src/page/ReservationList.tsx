import Header from "components/common/Header";
import ReservationCard from "components/domain/ReservationCard";
import { HEADER_TYPE } from "constant/stringConstant";
import { useReservation } from "hook/useReservation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SLayout from "styles/SLayout";
import { UserInfo } from "types/userType";
import { sortReservationTime } from "util/sortReservationTime";
const ReservationList = () => {
  // const { userInfoArray, handleDeleteReservation, handleSetSeatTrue } =
  //   useReservation();

  const [userInfoArray, setUserInfoArray] = useState<UserInfo[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("userInfo");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserInfoArray(parsedData);
    }
  }, []);

  useEffect(() => {
    //삭제 후 업데이트
    localStorage.setItem("userInfo", JSON.stringify(userInfoArray));
  }, [userInfoArray]);

  function handleDeleteReservation(id: string) {
    //예약카드 삭제하는 함수
    setUserInfoArray((prev) => prev.filter((userInfo) => userInfo.id !== id));
  }
  function handleSetSeatTrue(id: string) {
    setUserInfoArray((prev) =>
      prev.map((userInfo) =>
        userInfo.id === id ? { ...userInfo, isSeat: true } : userInfo
      )
    );
  }

  const sortedReservationCard = sortReservationTime(userInfoArray);

  return (
    <SGrayLayout>
      <Header pageType={HEADER_TYPE.LIST_PAGE} />
      <SCardLayout>
        {sortedReservationCard.map((info) => {
          if (!info.isSeat) {
            return (
              <ReservationCard
                key={info.id}
                userInfo={info}
                onDelete={handleDeleteReservation}
                onSeated={handleSetSeatTrue}
              />
            );
          }
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
