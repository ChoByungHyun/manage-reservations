import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ArrowIcon from "assets/arrow_drop_down.svg";
import { DOT, FORM_PLACEHOLDER, TABLE_INFO } from "constant/stringConstant";
import TableTagButton from "./TableTagButton";
import { TableInfo } from "types/userType";

type DropdownProps = {
  items: TableInfo[];
  table: TableInfo[];
  onTableUpdate: (selectedItems: TableInfo[]) => void;
  isDisabled: (table: TableInfo, selectedItems: TableInfo[]) => boolean;
  isTableReset: boolean;
  isDateValid: boolean;
};

function DropDown({
  items,
  onTableUpdate,
  table,
  isDisabled,
  isTableReset,
  isDateValid,
}: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isInitial, setIsInitial] = useState<boolean>(true);
  const [selectedItems, setSelectedItems] = useState<TableInfo[]>([]);
  const [initialSelectedItems, setInitialSelectedItems] = useState<TableInfo[]>(
    []
  );
  const dropdownRef = useRef<HTMLDivElement>(null); // dropdownRef 생성

  useEffect(() => {
    if (isInitial && items.length > 0 && table.length > 0) {
      const initialSelectedItems = items.filter((item) =>
        table.some(
          (tableItem) =>
            tableItem.table === item.table && tableItem.floor === item.floor
        )
      );
      setSelectedItems(initialSelectedItems);
      setInitialSelectedItems(initialSelectedItems); // 초기 선택된 테이블 정보를 저장
      setIsInitial(false);
    }
  }, [isInitial, items, table]);

  useEffect(() => {
    if (isTableReset) setSelectedItems([]);
    // setInitialSelectedItems([]);
  }, [isTableReset]);

  useEffect(() => {
    const selectedItemsTables = selectedItems.map((item) => item.table);
    const tableTables = Object.keys(table).map((key) => parseInt(key));
    if (JSON.stringify(selectedItemsTables) !== JSON.stringify(tableTables)) {
      onTableUpdate(selectedItems);
    }
  }, [selectedItems, onTableUpdate, table]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (item: TableInfo) => {
    if (
      selectedItems.length < 3 &&
      !selectedItems.some(
        (selectedItem) =>
          selectedItem.table === item.table && selectedItem.floor === item.floor
      )
    ) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleTagClick = (item: TableInfo) => (event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedItems(
      selectedItems.filter(
        (selectedItem) =>
          selectedItem.table !== item.table || selectedItem.floor !== item.floor
      )
    );
  };

  // items를 floor로 그룹화.
  const itemsByFloor = items.reduce<{ [floor: number]: TableInfo[] }>(
    (groups, item) => {
      const floor = item.floor;
      if (!groups[floor]) {
        groups[floor] = [];
      }
      groups[floor].push(item);
      return groups;
    },
    {}
  );

  return (
    <SDropdownContainer $isDisable={isDateValid} ref={dropdownRef}>
      <SButton
        onClick={() => {
          setIsDropdownOpen((prev) => !prev);
        }}
        disabled={isDateValid}
        $isDisable={isDateValid}
      >
        <STagButtonLayout
          className={selectedItems.length > 0 ? "has-items" : ""}
        >
          <div className="floating-label">{FORM_PLACEHOLDER.TABLE}</div>
          {selectedItems.length > 0 ? (
            selectedItems.map((item, index) => (
              <TableTagButton
                key={index}
                text={` ${TABLE_INFO.TABLE}${item.table} ${DOT} ${TABLE_INFO.FLOOR} ${item.floor} `}
                showCloseButton
                onClick={handleTagClick(item)}
                showDot={true}
                isDisabled={() => isDisabled(item, selectedItems)}
              />
            ))
          ) : (
            <STablePlaceholder>{FORM_PLACEHOLDER.TABLE}</STablePlaceholder>
          )}
        </STagButtonLayout>
        <SArrowIconWrapper $isOpen={isDropdownOpen}>
          <img src={ArrowIcon} alt="드롭다운" />
        </SArrowIconWrapper>
      </SButton>

      <SDropdownList $isOpen={isDropdownOpen}>
        {Object.values(itemsByFloor).map((itemsInFloor, index) => (
          <SFloorContainer key={index}>
            <SFloorTitle>{`${TABLE_INFO.FLOOR} ${itemsInFloor[0].floor}`}</SFloorTitle>
            <STableButtonsContainer>
              {itemsInFloor.map((item, index) => (
                <TableTagButton
                  key={index}
                  text={`${TABLE_INFO.TABLE} ${item.table}`}
                  showDot={false}
                  active={selectedItems.some(
                    (selectedItem) =>
                      selectedItem.table === item.table &&
                      selectedItem.floor === item.floor
                  )}
                  onClick={() => handleItemClick(item)}
                  isDisabled={() => isDisabled(item, initialSelectedItems)}
                />
              ))}
            </STableButtonsContainer>
          </SFloorContainer>
        ))}
      </SDropdownList>
    </SDropdownContainer>
  );
}

type DropdownListProps = {
  $isOpen: boolean;
};
type DropdownLayoutProps = {
  $isDisable: boolean;
};
const STablePlaceholder = styled.div`
  padding-left: 6px;
`;
const STagButtonLayout = styled.div`
  display: flex;
  gap: 10px;
  position: relative;
  font-size: 12px;
  color: var(--gray-600);

  .floating-label {
    position: absolute;

    background-color: white;
    padding: 0 5px;
    display: none;
    transition: opacity 0.3s, top 0.3s;
    opacity: 0;

    white-space: nowrap;

    transform: translateY(-50%);
    font-size: 12px;
  }

  &.has-items .floating-label {
    top: -10px;
    left: -5px;
    display: flex;
    opacity: 1;
  }
`;
const SDropdownContainer = styled.div<DropdownLayoutProps>`
  border-radius: 5px;
  opacity: ${(props) => (props.$isDisable ? 0.5 : 1)};
`;

const SButton = styled.button<DropdownLayoutProps>`
  width: 540px;
  height: 50px;
  border: 1px solid var(--gray-400);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 16px;
  color: var(--gray-800);
  opacity: ${(props) => (props.$isDisable ? 0.5 : 1)};
  cursor: ${(props) => (props.$isDisable ? "not-allowed" : "pointer")};
`;

const SArrowIconWrapper = styled.div<DropdownListProps>`
  transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
  transition: transform 0.3s ease;
`;

const SDropdownList = styled.div<DropdownListProps>`
  position: absolute;
  border: 1px solid var(--gray-400);
  width: 540px;
  height: 180px;
  overflow-y: scroll;
  border-radius: 5px;
  background-color: var(--white);
  padding: 10px 30px;
  box-sizing: border-box;
  z-index: 20;

  ${(props) =>
    props.$isOpen
      ? `
   display:flex;
   flex-wrap:wrap;
   gap:10px;
  `
      : `display:none;`}
`;
const SFloorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SFloorTitle = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
`;

const STableButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
export default DropDown;
