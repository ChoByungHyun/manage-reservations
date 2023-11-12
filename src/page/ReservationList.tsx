import Header from "components/common/Header";
import ReservationCard from "components/domain/ReservationCard";
import { HEADER_TYPE } from "constant/stringConstant";
import { useReservation } from "hook/useReservation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SLayout from "styles/SLayout";
import { UserInfo } from "types/userType";
import {
  convertTimeToHourAndMinute,
  sortReservationTime,
} from "util/sortReservationTime";
const ReservationList = () => {
  const { userInfoArray, handleDeleteReservation, handleSetSeatTrue } =
    useReservation();

  const [validReservations, setValidReservations] = useState<UserInfo[]>([]);
  const [validCardCount, setValidCardCount] = useState(0);

  useEffect(() => {
    const sortedReservationCard = sortReservationTime(userInfoArray);

    const validRes = sortedReservationCard.filter((info) => {
      const reservationDate = new Date(info.date.date);
      const [reservationHour, reservationMinute] = convertTimeToHourAndMinute(
        info.date.time
      );
      const reservationDateTime = new Date(
        reservationDate.setHours(reservationHour, reservationMinute)
      );

      return reservationDateTime >= new Date() && !info.isSeat;
    });

    setValidReservations(validRes);
    setValidCardCount(validRes.length);
  }, [userInfoArray]);

  return (
    <SGrayLayout>
      <Header
        pageType={HEADER_TYPE.LIST_PAGE}
        validCardCount={validCardCount}
      />
      <SCardLayout>
        {validReservations.map((info) => (
          <ReservationCard
            key={info.id}
            userInfo={info}
            onDelete={handleDeleteReservation}
            onSeated={handleSetSeatTrue}
          />
        ))}
      </SCardLayout>
    </SGrayLayout>
  );
};
const SCardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* gap: 10px; */

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
