import React, { useEffect } from "react";
import { useLetters } from "../../stores/useLetters";
import { useLetterView } from "../../stores/useLetterView";
import LetterView from "./LetterView";

type Move = "PREV" | "NEXT";

function LetterViewContainer() {
  const { isOpened, id, getLetter, open, close } = useLetterView();
  const { letters } = useLetters();

  useEffect(() => {
    getLetter();
  }, [id]);

  const getCurrentIndex = () => {
    return letters.findIndex((letter) => letter.id === id);
  };

  const isFirst = () => {
    const currentIndex = getCurrentIndex();

    if (currentIndex === 0) {
      return true;
    }

    return false;
  };

  const isLast = () => {
    const currentIndex = getCurrentIndex();

    if (currentIndex === letters.length - 1) {
      return true;
    }

    return false;
  };

  const getLetterId = (index: number) => {
    return letters[index].id;
  };

  const moveLetter = (move: Move) => {
    const currentIndex = getCurrentIndex();

    if (move === "PREV") {
      return getLetterId(currentIndex - 1);
    } else {
      return getLetterId(currentIndex + 1);
    }
  };

  const openMove = (move: Move) => {
    if (move === "PREV" && isFirst()) {
      return;
    }
    if (move === "NEXT" && isLast()) {
      return;
    }

    return open(moveLetter(move));
  };

  if (!isOpened) {
    return <></>;
  }

  return (
    <div>
      <button
        onClick={() => openMove("PREV")}
        disabled={isFirst()}
        type="button"
      >
        이전
      </button>
      <LetterView />
      <button
        onClick={() => openMove("NEXT")}
        disabled={isLast()}
        type="button"
      >
        다음
      </button>
      <button onClick={close} type="button">
        닫기
      </button>
    </div>
  );
}

export default LetterViewContainer;
