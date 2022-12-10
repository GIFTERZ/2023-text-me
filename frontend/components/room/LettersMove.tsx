import React from "react";
import styled from "styled-components";
import { useLetterPagination } from "../../stores/useLetterPagination";
import MoveNextIcon from "./icons/MoveNextIcon";
import MovePrevIcon from "./icons/MovePrevIcon";

type Move = "PREV" | "NEXT";

function LettersMove() {
  const { pagination, setPagination, lastPage } = useLetterPagination();

  const isFirst = () => {
    if (pagination === 0) {
      return true;
    }

    return false;
  };

  const isLast = () => {
    if (pagination === lastPage) {
      return true;
    }

    return false;
  };

  const movePage = (move: Move) => {
    if (move === "PREV") {
      setPagination(pagination - 1);
    }
    if (move === "NEXT") {
      setPagination(pagination + 1);
    }
  };

  return (
    <>
      <LeftButton
        onClick={() => movePage("PREV")}
        disabled={isFirst()}
        disabledStyle={isFirst()}
        type="button"
      >
        <MovePrevIcon />
      </LeftButton>
      <RightButton
        onClick={() => movePage("NEXT")}
        disabled={isLast()}
        disabledStyle={isLast()}
        type="button"
      >
        <MoveNextIcon />
      </RightButton>
    </>
  );
}

export default LettersMove;

const Button = styled.button<{ disabledStyle: boolean }>`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);

  background: none;
  border: none;
  visibility: ${(p) => (p.disabledStyle ? "hidden" : "visible")};
  svg {
    filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 1));
  }
`;

const LeftButton = styled(Button)`
  left: 1%;
`;

const RightButton = styled(Button)`
  right: 1%;
`;
