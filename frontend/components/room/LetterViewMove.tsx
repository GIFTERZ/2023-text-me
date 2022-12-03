import React, { ReactNode } from "react";
import { useLetters } from "../../stores/useLetters";
import { useLetterView } from "../../stores/useLetterView";

interface Props {
  children: ReactNode;
}

type Move = "PREV" | "NEXT";

function LetterViewMove(props: Props) {
  const { id, open } = useLetterView();
  const { letters } = useLetters();

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

  return (
    <>
      <button
        onClick={() => openMove("PREV")}
        disabled={isFirst()}
        type="button"
      >
        이전
      </button>
      {props.children}
      <button
        onClick={() => openMove("NEXT")}
        disabled={isLast()}
        type="button"
      >
        다음
      </button>
    </>
  );
}

export default LetterViewMove;
