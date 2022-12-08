import React from "react";
import { useCaptureMode } from "../../stores/useCaptureMode";
import { Modal, Overlay } from "../../styles/components/Modal";

interface Props {
  text: string;
}

function SaveModal({ text }: Props) {
  const { toggleModalOpen } = useCaptureMode();
  return (
    <>
      <Overlay />
      <Modal>
        {text}
        <button onClick={toggleModalOpen}>확인</button>
      </Modal>
    </>
  );
}

export default SaveModal;
