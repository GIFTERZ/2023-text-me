import React, { useState } from "react";
import { useLetterView } from "../../stores/useLetterView";
import ReactCardFlip from "react-card-flip";
import { useRoomInfo } from "../../stores/useRoomInfo";

function LetterView() {
  const {
    letter,
    isLoading: isLetterLoading,
    error: letterError,
  } = useLetterView();

  const {
    roomInfo,
    isLoading: isRoomLoading,
    error: roomError,
  } = useRoomInfo();

  const [isFlipped, setIsFlipped] = useState(false);

  const flip = () => {
    setIsFlipped((prev) => !prev);
  };

  if (isLetterLoading || isRoomLoading) {
    return <div>Loading...</div>;
  }

  if (letterError || roomError) {
    return <div>편지 불러오기에 실패했습니다.</div>;
  }

  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipDirection="horizontal"
      flipSpeedBackToFront={1}
      flipSpeedFrontToBack={1}
    >
      <div
        style={{
          width: "250px",
          height: "200px",
        }}
      >
        <img
          src={letter?.cardImg}
          onClick={flip}
          style={{
            height: "200px",
            width: "250px",
          }}
        />
      </div>

      <div
        onClick={flip}
        style={{
          height: "200px",
          width: "250px",
          background: "aliceblue",
        }}
      >
        To. {roomInfo?.ownerName}
        {letter?.content} From. {letter?.writer}
      </div>
    </ReactCardFlip>
  );
}

export default LetterView;
