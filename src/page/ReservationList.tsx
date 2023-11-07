import Header from "components/common/Header";
import { HEADER_TYPE } from "constant/stringConstant";
import React from "react";

const ReservationList = () => {
  return (
    <>
      <Header pageType={HEADER_TYPE.LIST_PAGE} />
      <div>list</div>
    </>
  );
};

export default ReservationList;
