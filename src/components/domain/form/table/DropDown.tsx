import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ArrowIcon from "assets/arrow_drop_down.svg";
import { FORM_PLACEHOLDER } from "constant/stringConstant";
import TableTagButton from "./TableTagButton";

type DropdownItem = {
  name: string;
  id: string;
};

type DropdownProps = {
  items: DropdownItem[];
  table: Record<string, string>;
  onTableUpdate: (selectedItems: DropdownItem[]) => void;
};

function DropDown({ items, onTableUpdate, table }: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isInitial, setIsInitial] = useState<boolean>(true);
  const [selectedItems, setSelectedItems] = useState<DropdownItem[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null); // dropdownRef 생성
  useEffect(() => {
    // items와 table이 모두 도착했을 때만 초기 선택된 아이템을 설정합니다.
    if (isInitial && items.length > 0 && Object.keys(table).length > 0) {
      const initialSelectedItems = items.filter((item) => item.id in table);
      setSelectedItems(initialSelectedItems);
      setIsInitial(false);
    }
  }, [isInitial, items, table]);

  useEffect(() => {
    // selectedItems가 변경될 때만 onTableUpdate 호출
    const selectedItemsIds = selectedItems.map((item) => item.id);
    const tableIds = Object.keys(table);

    if (JSON.stringify(selectedItemsIds) !== JSON.stringify(tableIds)) {
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

  const handleItemClick = (item: DropdownItem) => {
    if (
      selectedItems.length < 3 &&
      !selectedItems.some((selectedItem) => selectedItem.id === item.id)
    ) {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const handleTagClick = (item: DropdownItem) => (event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedItems(
      selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
    );
  };

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
            selectedItems.map((item) => (
              <TableTagButton
                key={item.id}
                text={item}
                showCloseButton // SButton에 있는 태그에만 SCloseButton 보이도록
                onClick={handleTagClick(item)} // SCloseButton 클릭 시 해당 태그 제거
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
        {items.map((item) => (
          <TableTagButton
            text={item}
            active={selectedItems.some(
              (selectedItem) => selectedItem.id === item.id
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
  ${(props) => props.$isOpen && `border : 1px solid var(--primary)`}
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
