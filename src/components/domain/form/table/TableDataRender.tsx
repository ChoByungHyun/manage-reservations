import { TableInfo } from "types/userType";
import styled from "styled-components";
import { DOT, TABLE_INFO } from "constant/stringConstant";

const TableDataRender = (tableInfo: TableInfo[]) => {
  const floorTableMap = tableInfo.reduce((acc, curr) => {
    if (!acc[curr.floor]) {
      acc[curr.floor] = [];
    }
    acc[curr.floor].push(curr.table);
    return acc;
  }, {} as Record<number, number[]>);

  return Object.entries(floorTableMap).map(([floor, tables], index) => (
    <SLayout key={index}>
      {TABLE_INFO.TABLE}
      <STableNumber>
        {tables.sort((a, b) => a - b).join(", ")}
      </STableNumber>{" "}
      {DOT} {TABLE_INFO.FLOOR}
      <SFloorNumber> {floor}</SFloorNumber>
    </SLayout>
  ));
};
const SLayout = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;
const STableNumber = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: var(--gray-1000);
`;

const SFloorNumber = styled.span``;

export default TableDataRender;
