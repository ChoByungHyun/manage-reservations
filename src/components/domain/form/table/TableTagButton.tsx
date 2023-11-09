import styled from "styled-components";
import CloseIcon from "assets/close.svg";
type DropdownItem = {
  name: string;
  id: string;
};
type Props = {
  text: DropdownItem;
  active?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  showCloseButton?: boolean;
};
// 태그버튼 컴포넌트
const TableTagButton: React.FC<Props> = ({
  text,
  active,
  onClick,
  showCloseButton,
}) => {
  return (
    <STagButton
      $active={active}
      onClick={onClick}
      className={active ? "active" : ""}
    >
      {text.name}
      {showCloseButton && (
        <SButtonLayout $active={showCloseButton}>
          <SCloseButton src={CloseIcon} alt="삭제아이콘" />
        </SButtonLayout>
      )}
    </STagButton>
  );
};

type TagProps = {
  $active: boolean | undefined;
};
const SButtonLayout = styled.div<TagProps>`
  display: flex;
  border-radius: 50%;
  background-color: var(--gray-400);
  &:hover {
  }
`;
const SCloseButton = styled.img`
  width: 10px;
  height: 10px;
  padding: 2px;
`;
const STagButton = styled.div<TagProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 44px;
  padding: 8px;
  font-size: 12px;
  color: var(--black);
  white-space: nowrap;
  background-color: var(--gray-200);

  cursor: pointer;
  &.active {
    border: 1px solid var(--primary);
  }
  &:hover {
    scale: ${(props) => (props.$active ? 1 : 1.01)};
  }
`;

export default TableTagButton;
