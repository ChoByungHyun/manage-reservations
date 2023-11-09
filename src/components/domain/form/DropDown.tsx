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
};

function DropDown({ items }: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const [selectedItems, setSelectedItems] = useState<DropdownItem[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null); // dropdownRef 생성

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
        <STagButtonLayout>
          {selectedItems.length > 0
            ? selectedItems.map((item) => (
                <TableTagButton
                  key={item.id}
                  text={item}
                  active
                  showCloseButton // SButton에 있는 태그에만 SCloseButton 보이도록
                  onClick={handleTagClick(item)} // SCloseButton 클릭 시 해당 태그 제거
                />
              ))
            : FORM_PLACEHOLDER.TABLE}
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
const STagButtonLayout = styled.div`
  display: flex;
  gap: 10px;
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
  ${(props) => props.$isOpen && `border : 2px solid var(--primary)`}
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
