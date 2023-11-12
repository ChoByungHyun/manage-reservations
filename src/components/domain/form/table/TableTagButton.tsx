import styled from "styled-components";
import CloseIcon from "assets/close-white.svg";
import { DOT } from "constant/stringConstant";

type Props = {
  text: string;
  active?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  showCloseButton?: boolean;
  isDisabled?: () => boolean;
  showDot: boolean;
};
// 태그버튼 컴포넌트
const TableTagButton: React.FC<Props> = ({
  text,
  active,
  onClick,
  showCloseButton,
  isDisabled,
  showDot,
}) => {
  const textParts = text.split(DOT);
  const disabled = isDisabled ? isDisabled() : false;
  return (
    <STagButton
      $active={active}
      onClick={disabled ? undefined : onClick}
      $isDisabled={disabled}
      className={active ? "active" : ""}
    >
      <STableText>{textParts[0]}</STableText>
      {showDot && <SDot>{DOT}</SDot>}
      <STableText>{textParts[1]}</STableText>
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
type ButtonTagProps = {
  $active: boolean | undefined;
  $isDisabled: boolean;
};
const SDot = styled.p`
  font-size: 9px;
`;
const STableText = styled.p`
  font-size: 14px;
`;
const SButtonLayout = styled.div<TagProps>`
  display: flex;
  border-radius: 50%;
  background-color: var(--gray-400);
  width: 12px;
  height: 12px;
  padding: 1px;

  &:hover {
  }
`;
const SCloseButton = styled.img`
  padding: 2px;
`;
const STagButton = styled.div<ButtonTagProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 44px;
  padding: 8px;
  font-size: 12px;
  color: var(--gray-1000);
  white-space: nowrap;
  background-color: var(--gray-200);
  ${({ $isDisabled }) =>
    $isDisabled &&
    `
    opacity: 0.5;
    pointer-events: none;
  `}

  cursor: pointer;
  &.active {
    ${({ $isDisabled }) =>
      $isDisabled
        ? `
    border: none;
  `
        : `
    border: 1px solid var(--primary);
    
  `}
  }
  &:hover {
    scale: ${(props) => (props.$active ? 1 : 1.01)};
  }
`;

export default TableTagButton;
