import React from "react";
import { WhiteButton } from "../../styles/components/Button";
import { useCaptureMode } from "../../stores/useCaptureMode";
import CameraIcon from "./icons/CameraIcon";

function SaveContainer() {
  const { toggleCaptureMode, toggleModalOpen } = useCaptureMode();

  const startCaptureMode = () => {
    toggleModalOpen();
    toggleCaptureMode();
  };

  return (
    <WhiteButton onClick={startCaptureMode} type="button">
      <CameraIcon />
    </WhiteButton>
  );
}

export default SaveContainer;
