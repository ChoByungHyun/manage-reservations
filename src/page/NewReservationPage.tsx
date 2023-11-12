import React from "react";
import Header from "components/common/Header";
import CreateReservation from "components/domain/CreateReservation";
import { HEADER_TYPE } from "constant/stringConstant";
import styled from "styled-components";
const NewReservationPage = () => {
  return (
    <>
      <Header pageType={HEADER_TYPE.CREATE_PAGE} />
      <SLayout>
        <CreateReservation />
      </SLayout>
    </>
  );
};
const SLayout = styled.div`
  background-color: white;
`;

export default NewReservationPage;
