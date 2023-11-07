import Header from "components/common/Header";
import { HEADER_TYPE } from "constant/stringConstant";
import React from "react";

const NewReservationPage = () => {
  return (
    <>
      <Header pageType={HEADER_TYPE.CREATE_PAGE} />
      <div>new</div>
    </>
  );
};

export default NewReservationPage;
