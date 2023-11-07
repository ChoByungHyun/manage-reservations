import Header from "components/common/Header";
import { HEADER_TYPE } from "constant/stringConstant";
import React from "react";
import styled from "styled-components";
import SLayout from "styles/SLayout";
const ReservationList = () => {
  return (
    <SGrayLayout>
      <Header pageType={HEADER_TYPE.LIST_PAGE} />
      <div>list</div>
    </SGrayLayout>
  );
};
const SGrayLayout = styled(SLayout)`
  background-color: var(--bg);
`;
export default ReservationList;
