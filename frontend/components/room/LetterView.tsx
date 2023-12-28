import React, { useEffect, useState } from "react";
import { useLetterView } from "../../stores/useLetterView";
import ReactCardFlip from "react-card-flip";
import { useRoomInfo } from "../../stores/useRoomInfo";
import styled from "styled-components";
import { Spinner } from "../../styles/indicators/Loader";
import DeferredComponent from "../common/DeferredComponent";

function LetterView() {
  const { letter, getLetter, isOpened, isLoading: isLetterLoading, error: letterError } = useLetterView();

  useEffect(() => {
    getLetter();
  }, []);

  const { roomInfo, isLoading: isRoomLoading, error: roomError } = useRoomInfo();

  const [isFlipped, setIsFlipped] = useState(false);

  const flip = () => {
    setIsFlipped(prev => !prev);
  };

  const lineBreak = (content: string) => {
    return (
      <>
        {content?.split("\n").map((value, index) => (
          <>
            {value}
            <br />
          </>
        ))}
      </>
    );
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
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
        <Card>
          <img src={letter?.imageUrl} onClick={flip} />
        </Card>
        <CardBack imgUrl={letter?.imageUrl} onClick={flip}>
          <ToText>To. {roomInfo?.userName}</ToText>
          <Content>{lineBreak(letter?.contents)}</Content>
          <FromText>From. {letter?.senderName}</FromText>
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
  padding: 24px 24px 48px 24px;
  width: 320px;
  height: 400px;

  box-shadow: 1px 1px 8px 3px rgba(62, 78, 82, 0.4), inset -2px -2px 2px rgba(106, 106, 106, 0.25),
    inset 2px 2px 2px rgba(255, 255, 255, 0.3);
  border-radius: 5px;

  background-color: #ffffff;

  img {
    width: 272px;
    height: 272px;

    object-fit: cover;
    border-radius: 5px;
  }

  @media ${({ theme }) => theme.device.small} {
    width: 240px;

    img {
      width: 190px;
      height: 190px;
    }
  }
`;

const CardBack = styled(Card)<{ imgUrl: string }>`
  display: grid;
  grid-template-rows: 80px 230px 80px;
  padding: 0;

  background: ${p => `linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.8)
    ),
    url(${p.imgUrl})`};
  background-size: cover;
  background-position: center;
  border-radius: 5px;

  font-family: "UhBeeMiMi";
`;

const ToText = styled.h2`
  display: flex;
  align-items: center;

  margin: 0 27px;

  font-weight: 400;
  font-size: 22px;
  line-height: 27px;

  color: #222222;

  @media ${({ theme }) => theme.device.small} {
    font-size: 18px;
  }
`;

const Content = styled.p`
  margin: 0 37px;

  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;

  color: #222222;

  overflow-y: scroll;
`;

const FromText = styled.h2`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin: 0 27px;

  font-weight: 400;
  font-size: 22px;
  line-height: 27px;

  color: #222222;

  @media ${({ theme }) => theme.device.small} {
    font-size: 18px;
  }
`;
