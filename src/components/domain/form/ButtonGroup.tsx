import React from "react";
import styled from "styled-components";
import DeleteIcon from "assets/trash.svg";
import { BUTTON_TYPE } from "constant/stringConstant";
type Props = {
  onClose?: () => void;
  buttonType?: string;
  onSave?: () => void;
  onDelete?: (id: string) => void;
  userId?: string;
  onSeated?: (id: string) => void;
  isEditMode?: boolean;
  disabled?: boolean;
};
const ButtonGroup: React.FC<Props> = ({
  onClose,
  buttonType,
  onSave,
  onDelete,
  userId,
  onSeated,
  isEditMode,
  disabled,
}) => {
  function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    console.log("delete");
    e.stopPropagation();
    // userId && handleDeleteReservation(userId);
    onDelete && userId && onDelete(userId);
  }
  async function hadleEditDelete(e: React.MouseEvent<HTMLButtonElement>) {
    handleDelete(e);
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  function handleSeated(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onSeated && userId && onSeated(userId);
  }

  return (
    <SLayout>
      {buttonType === BUTTON_TYPE.ONLY_SAVE ? (
        <SConfirmButton disabled={disabled} onClick={onSave}>
          {BUTTON_TYPE.ONLY_SAVE}
        </SConfirmButton>
      ) : buttonType === BUTTON_TYPE.SAVE_DELETE ? (
        <>
          <SDeleteButton onClick={onClose}>
            <img src={DeleteIcon} alt="휴지통" />
          </SDeleteButton>
          <SConfirmButton disabled={disabled} onClick={onSave}>
            {BUTTON_TYPE.ONLY_SAVE}
          </SConfirmButton>
        </>
      ) : (
        <>
          <SDeleteButton onClick={handleDelete}>
            <img src={DeleteIcon} alt="휴지통" />
          </SDeleteButton>
          <SConfirmButton
            disabled={disabled}
            onClick={isEditMode ? onSave : handleSeated}
          >
            {BUTTON_TYPE.SEATED}
          </SConfirmButton>
        </>
      )}
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  /* margin-bottom: 20px; */
`;
const SDeleteButton = styled.button`
  border-radius: 8px;
  padding: 10px 20px;

  background-color: var(--gray-200);
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  &:hover {
    scale: 1.02;
  }
`;
const SConfirmButton = styled.button`
  flex: 1;
  padding: 20px 30px;
  background-color: var(--primary);

  border-radius: 8px;
  color: white;
  font-size: 16px;
  &:hover {
    scale: 1.01;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      scale: 1;
    }
  }
`;
export default ButtonGroup;
