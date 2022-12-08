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
    <ButtonContainer>
      <Button
        onClick={() => movePage("PREV")}
        disabled={isFirst()}
        disabledStyle={isFirst()}
        type="button"
      >
        <MovePrevIcon />
      </Button>
      <Button
        onClick={() => movePage("NEXT")}
        disabled={isLast()}
        disabledStyle={isLast()}
        type="button"
      >
        <MoveNextIcon />
      </Button>
    </ButtonContainer>
  );
}

export default LettersMove;

const ButtonContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: space-between;

  width: 100%;

  padding: 0 3px;
  z-index: 30;
`;
const Button = styled.button<{ disabledStyle: boolean }>`
  background: none;
  border: none;
  z-index: 10;
  visibility: ${(p) => (p.disabledStyle ? "hidden" : "visible")};
  svg {
    filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 1));
  }
`;
