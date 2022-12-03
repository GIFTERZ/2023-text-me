import React, { useState } from "react";
import { useLetterView } from "../../stores/useLetterView";
import ReactCardFlip from "react-card-flip";
import { useRoomInfo } from "../../stores/useRoomInfo";
import styled from "styled-components";
import { Spinner } from "../../styles/indicators/Loader";
import DeferredComponent from "../common/DeferredComponent";

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
    return (
      <DeferredComponent>
        <Spinner />
      </DeferredComponent>
    );
  }

  if (letterError || roomError) {
    return <div>편지 불러오기에 실패했습니다.</div>;
  }

  return (
    <Container>
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        flipSpeedBackToFront={1}
        flipSpeedFrontToBack={1}
      >
        <Card>
          <img src={letter?.cardImg} onClick={flip} />
        </Card>
        <CardBack imgUrl={letter?.cardImg} onClick={flip}>
          <ToText>To. {roomInfo?.ownerName}</ToText>
          <Content>{letter?.content}</Content>
          <FromText>From. {letter?.writer}</FromText>
        </CardBack>
      </ReactCardFlip>
    </Container>
  );
}

export default LetterView;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Card = styled.div`
  width: 320px;
  height: 400px;

  border: 5px solid #ffffff;
  border-radius: 20px;

  img {
    width: 100%;
    height: 100%;

    object-fit: cover;
    border-radius: 20px;
  }
`;

const CardBack = styled(Card)<{ imgUrl: string }>`
  display: grid;
  grid-template-rows: 80px 230px 80px;

  background: ${(p) => `linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.8)
    ),
    url(${p.imgUrl})`};
  background-size: cover;
  border-radius: 20px;
`;

const ToText = styled.h2`
  display: flex;
  align-items: center;

  margin: 0 27px;

  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  color: #222222;
`;

const Content = styled.p`
  margin: 0 37px;

  font-weight: 400;
  font-size: 14px;
  line-height: 24px;

  color: #222222;

  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    color: none;
  }
`;

const FromText = styled.h2`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin: 0 27px;

  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  color: #222222;
`;
