import React from "react";
import { Modal, Overlay } from "../../styles/components/Modal";

interface Props {
  text: string;
}

function SaveModal({ text }: Props) {
  return (
    <>
      <Overlay />
      <Modal>{text}</Modal>
    </>
  );
}

export default SaveModal;
