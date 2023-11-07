import React, { useState } from "react";
import styled from "styled-components";
import ArrowIcon from "assets/arrow_drop_down.svg";
import { FORM_PLACEHOLDER } from "constant/stringConstant";

type DropdownItem = {
  name: string;
  id: string;
};

type DropdownProps = {
  items: DropdownItem[];
};

function DropDown({ items }: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<string>(
    FORM_PLACEHOLDER.TABLE
  );

  return (
    <SDropdownContainer>
      <SButton
        onClick={() => {
          setIsDropdownOpen((prev) => !prev);
        }}
        $isOpen={isDropdownOpen}
      >
        {selectedItem}
        <SArrowIconWrapper $isOpen={isDropdownOpen}>
          <img src={ArrowIcon} alt="드롭다운" />
        </SArrowIconWrapper>
      </SButton>

      <SDropdownList $isOpen={isDropdownOpen}>
        {items.map((item) => (
          <SDropdownItemWrapper
            $isOpen={isDropdownOpen}
            key={item.id}
            onClick={() => {
              setSelectedItem(item.name);
              setIsDropdownOpen(false);
            }}
          >
            {item.name}
          </SDropdownItemWrapper>
        ))}
      </SDropdownList>
    </SDropdownContainer>
  );
}

type DropdownListProps = {
  $isOpen: boolean;
};

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
  padding: 16px;
  color: var(--gray-800);
  ${(props) => props.$isOpen && `border : 2px solid var(--primary)`}
`;

const SArrowIconWrapper = styled.div<DropdownListProps>`
  /* transform: ${({ $isOpen }) =>
    $isOpen ? "rotate(0deg)" : "rotate(180deg"}; */
`;

const SDropdownList = styled.div<DropdownListProps>`
  position: absolute;
  border: 1px solid var(--gray-400);
  width: 540px;
  border-radius: 5px;
  background-color: var(--gray-200);
  ${(props) =>
    props.$isOpen
      ? `
   display:block;
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
