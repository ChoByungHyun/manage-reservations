import React, { useState } from "react";
import Header from "components/common/Header";
import { HEADER_TYPE } from "constant/stringConstant";
import styled from "styled-components";
import CreateReservation from "components/domain/CreateReservation";
import { useLocation } from "react-router-dom";

const EditReservationPage = () => {
  const location = useLocation();
  const userInfoState = location.state;
  const [userInfo, setUserInfo] = useState(userInfoState);

  return (
    <>
      <Header pageType={HEADER_TYPE.EDIT_PAGE} />
      <SLayout>
        <CreateReservation userInfo={userInfo} />
      </SLayout>
    </>
  );
};
const SLayout = styled.div`
  background-color: white;
`;
export default EditReservationPage;
