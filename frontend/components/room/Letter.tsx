import React from "react";
import styled from "styled-components";
import { useLetterView } from "../../stores/useLetterView";
import { Letter } from "../../types";

type CardStyle = {
  top: number;
  left: number;
  rotate: number;
};

interface Props {
  letter: Letter;
  cardStyle: CardStyle;
}

function LetterComponent({ letter, cardStyle }: Props) {
  const { open } = useLetterView();

  return (
    <Card
      onClick={() => open(letter.id)}
      top={cardStyle.top}
      left={cardStyle.left}
      rotate={cardStyle.rotate}
    >
      <CardImg src={letter.imageUrl} />
    </Card>
  );
}

export default LetterComponent;

const Card = styled.div<CardStyle>`
  position: absolute;
  top: ${(p) => p.top}px;
  left: ${(p) => p.left}px;
  transform: rotate(${(p) => p.rotate}deg);
  width: 97px;
  height: 120px;
  padding: 6px 6px 30px 6px;

  background: white;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25),
    inset 2px 2px 2px rgba(184, 188, 189, 0.4);
  border-radius: 5px;

  @media ${({ theme }) => theme.device.small} {
    width: 80px;
    height: 100px;
    padding: 5px 5px 20px 5px;
  }
  @media ${({ theme }) => theme.device.large} {
    left: ${(p) => p.left / 1.2}px;
  }
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  border-radius: 5px;
`;
