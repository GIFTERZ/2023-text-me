import React from "react";
import styled from "styled-components";
import { useCaptureMode } from "../../stores/useCaptureMode";
import { Modal } from "../../styles/components/Modal";

function SaveModal() {
  const { toggleModalOpen } = useCaptureMode();
  return (
    <Container>
      캡처 모드입니다. 종료하려면 아래의 종료 버튼을 누르세요.
      <Button type="button" onClick={toggleModalOpen}>
        확인
      </Button>
    </Container>
  );
}

export default SaveModal;

const Container = styled(Modal)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 32px;
  width: fit-content;
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
