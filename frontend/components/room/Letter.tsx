import { useSearchParams } from "next/navigation";
import React from "react";
import styled from "styled-components";
import { useLetterView } from "../../stores/useLetterView";
import { useMembers } from "../../stores/useMembers";
import { Letter } from "../../types";
import { useCaptureMode } from "../../stores/useCaptureMode";

type CardStyle = {
  top: number;
  left: number;
  rotate: number;
  isCaptureMode?: boolean;
};

interface Props {
  letter: Letter;
  cardStyle: CardStyle;
}

function LetterComponent({ letter, cardStyle }: Props) {
  const { get } = useSearchParams();
  const userId = Number(get("uid"));

  const { open } = useLetterView();
  const { member, getMember } = useMembers();
  const { isCaptureMode } = useCaptureMode();

  const checkAuthOpen = (letterId: number) => {
    getMember();

    if (member === null || member?.id !== userId) {
      alert("본인의 편지만 열람할 수 있습니다.");
      return;
    }

    if (member.id === userId) {
      open(letterId);
    }
  };

  return (
    <Card
      onClick={() => checkAuthOpen(letter.id)}
      top={cardStyle.top}
      left={cardStyle.left}
      rotate={cardStyle.rotate}
      isCaptureMode={isCaptureMode}
    >
      <CardImg src={letter.imageUrl} />
    </Card>
  );
}

export default LetterComponent;

const Card = styled.div<CardStyle>`
  position: absolute;
  top: ${(p) => (p.isCaptureMode ? p.top / 1.06 : p.top)}px;
  left: ${(p) => (p.isCaptureMode ? p.left / 1.05 : p.left)}px;
  transform: rotate(${(p) => p.rotate}deg);
  width: 97px;
  height: 120px;
  padding: 6px 6px 30px 6px;

  background: white;
  box-shadow: 1px 1px 8px 3px rgba(62, 78, 82, 0.4),
    inset -1px -1px 2px rgba(106, 106, 106, 0.25),
    inset 2px 2px 2px rgba(255, 255, 255, 0.6);
  border-radius: 2px;

  @media ${({ theme }) => theme.device.small} {
    width: 80px;
    height: 100px;
    padding: 5px 5px 20px 5px;
  }
  @media ${({ theme }) => theme.device.large} {
    top: ${(p) => (p.isCaptureMode ? p.top / 1.15 - 30 : p.top / 1.2)}px;
    left: ${(p) => (p.isCaptureMode ? p.left / 1.16 : p.left / 1.15)}px;
  }
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  border-radius: 2px;
`;
