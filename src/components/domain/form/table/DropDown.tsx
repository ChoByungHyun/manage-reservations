import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ArrowIcon from "assets/arrow_drop_down.svg";
import { FORM_PLACEHOLDER, TABLE_INFO } from "constant/stringConstant";
import TableTagButton from "./TableTagButton";
import { TableInfo } from "types/userType";
import { DOT } from "components/domain/form/table/RenderTableData";

type DropdownProps = {
  items: TableInfo[];
  table: TableInfo[];
  onTableUpdate: (selectedItems: TableInfo[]) => void;
};

function DropDown({ items, onTableUpdate, table }: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isInitial, setIsInitial] = useState<boolean>(true);
  const [selectedItems, setSelectedItems] = useState<TableInfo[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null); // dropdownRef 생성

  useEffect(() => {
    // 페이지에 처음 접근했을 때만 실행
    if (isInitial && items.length > 0 && table.length > 0) {
      const initialSelectedItems = items.filter((item) =>
        table.some(
          (tableItem) =>
            tableItem.table === item.table && tableItem.floor === item.floor
        )
      );
      setSelectedItems(initialSelectedItems);
      setIsInitial(false);
    }
  }, [isInitial, items, table]);

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
      !selectedItems.some((selectedItem) => selectedItem.table === item.table)
    ) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleTagClick = (item: TableInfo) => (event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedItems(
      selectedItems.filter((selectedItem) => selectedItem.table !== item.table)
    );
  };

  console.log(
    "🚀 ~ file: DropDown.tsx:68 ~ handleTagClick ~ selectedItems:",
    selectedItems
  );
  return (
    <SDropdownContainer ref={dropdownRef}>
      <SButton
        onClick={() => {
          setIsDropdownOpen((prev) => !prev);
        }}
        $isOpen={isDropdownOpen}
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
        {items.map((item, index) => (
          <TableTagButton
            key={index}
            text={` ${TABLE_INFO.TABLE} ${item.table} ${DOT} ${TABLE_INFO.FLOOR} ${item.floor} `}
            active={selectedItems.some(
              (selectedItem) => selectedItem.table === item.table
            )}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </SDropdownList>
    </SDropdownContainer>
  );
}

type DropdownListProps = {
  $isOpen: boolean;
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
    transition: opacity 0.3s, top 0.3s;
    opacity: 0;
    white-space: nowrap;

    transform: translateY(-50%);
    font-size: 12px;
  }

  &.has-items .floating-label {
    top: -10px;
    left: -5px;
    opacity: 1;
  }
`;
const SDropdownContainer = styled.div`
  border-radius: 5px;
`;

const SButton = styled.button<DropdownListProps>`
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
  /* ${(props) => props.$isOpen && `border : 1px solid var(--primary)`} */
`;

const SArrowIconWrapper = styled.div<DropdownListProps>`
  transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
  transition: transform 0.3s ease;
`;

const SDropdownList = styled.div<DropdownListProps>`
  position: absolute;
  border: 1px solid var(--gray-400);
  width: 540px;
  border-radius: 5px;
  background-color: var(--white);
  padding: 10px 30px;
  box-sizing: border-box;
  ${(props) =>
    props.$isOpen
      ? `
   display:flex;
   flex-wrap:wrap;
   gap:10px;
  `
      : `display:none;`}
`;

const SDropdownItemWrapper = styled.div<DropdownListProps>`
  display: flex;
  align-items: center;
  position: relative;
  height: 20px;
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid var(--gray-400);
  cursor: pointer;
`;

export default DropDown;
