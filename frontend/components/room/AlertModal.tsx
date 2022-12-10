import React from 'react';
import styled from 'styled-components';
import { useAlertModal } from '../../stores/useAlertModal';
import { Modal } from '../../styles/components/Modal';
const LETTER_NOT_OWN_MESSAGE = '본인의 편지만 열어볼 수 있어요!';

interface Props {
  text: string;
}

function AlertModal({ text }: Props) {
  const { toggleAlertModalOpen, toggleEmptyLetterModalOpen } = useAlertModal();

  if (text === LETTER_NOT_OWN_MESSAGE) {
    return (
      <Container>
        {text}
        <Button type="button" onClick={toggleAlertModalOpen}>
          확인
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      {text}
      <Button type="button" onClick={toggleEmptyLetterModalOpen}>
        확인
      </Button>
    </Container>
  );
}

export default AlertModal;

const Container = styled(Modal)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 32px;

  width: 70%;
  height: fit-content;

  background: rgba(21, 21, 21, 0.75);
  color: #ffffff;
`;

const Button = styled.button`
  padding: 5px 10px;
  background: #ffffff;
  border: none;
  border-radius: 5px;
`;
