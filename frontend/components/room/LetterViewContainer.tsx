import React, { useEffect } from "react";
import styled from "styled-components";
import { useLetterView } from "../../stores/useLetterView";
import LetterView from "./LetterView";
import LetterViewMove from "./LetterViewMove";

function LetterViewContainer() {
  const { isOpened, id, getLetter, close } = useLetterView();

  useEffect(() => {
    getLetter();
  }, [id]);

  if (!isOpened) {
    return <></>;
  }

  return (
    <div>
      <Overlay onClick={close} />
      <LetterViewMove>
        <LetterView />
      </LetterViewMove>
    </div>
  );
}

export default LetterViewContainer;

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  background: rgba(111, 111, 111, 0.8);
`;
