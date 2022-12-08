import React, { useEffect } from "react";
import styled from "styled-components";
import { useCaptureMode } from "../../stores/useCaptureMode";
import { useLetterPagination } from "../../stores/useLetterPagination";
import { useLetters } from "../../stores/useLetters";
import Letter from "./Letter";
import LettersMove from "./LettersMove";

interface Props {
  userId: number;
}

function LettersContainer({ userId }: Props) {
  const { isCaptureMode } = useCaptureMode();
  const { pagination, setLastPage } = useLetterPagination();
  const { error, letters, getLetters } = useLetters();

  useEffect(() => {
    getLetters(userId);
  }, []);

  useEffect(() => {
    setLastPage(Math.floor(letters.length / letterFrame.length));
  }, [letters]);

  if (error) {
    return (
      <ErrorMessage>
        편지를 불러오는 중<br />
        에러가 발생했습니다.
      </ErrorMessage>
    );
  }

  return (
    <Container id="lettersContainer">
      {letters.length > letterFrame.length && <LettersMove />}
      <Background
        src={"static/images/room-background.png"}
        isCaptureMode={isCaptureMode}
      />
      {letterFrame
        ?.filter((_, index) => letters[index + letterFrame.length * pagination])
        .map((frame, index) => (
          <Letter key={index} letter={letters[index]} cardStyle={frame} />
        ))}
    </Container>
  );
}

export default LettersContainer;

const letterFrame = [
  { top: 195, left: -13, rotate: 21.7 },
  { top: 258, left: 117, rotate: 0 },
  { top: 225, left: 250, rotate: -14.62 },
  { top: 438, left: 30, rotate: 8.32 },
  { top: 416, left: 166, rotate: -16.77 },
  { top: 366, left: 295, rotate: 15.16 },
  { top: 201, left: 351, rotate: 15.09 },
  { top: 403, left: 452, rotate: -7.67 },
  { top: 217, left: 505, rotate: 4.75 },
  { top: 356, left: 594, rotate: -20.84 },
  { top: 165, left: 616, rotate: -13.01 },
  { top: 80, left: 720, rotate: 24.11 },
  { top: 348, left: 731, rotate: 24.97 },
  { top: 165, left: 873, rotate: 6.59 },
  { top: 381, left: 931, rotate: -3.95 },
  { top: 125, left: 1015, rotate: -18.14 },
  { top: 342, left: 1074, rotate: -16.24 },
  { top: 97, left: 1130, rotate: 9.05 },
  { top: 211, left: 1200, rotate: 17.94 },
  { top: 366, left: 1231, rotate: 20.6 },
  { top: 242, left: 1334, rotate: -5.51 },
  { top: 397, left: 1414, rotate: -20.36 },
  { top: 165, left: 1419, rotate: -20.36 },
];

const Background = styled.img<{ isCaptureMode: boolean }>`
  position: absolute;
  top: 0;
  height: ${(p) => (p.isCaptureMode ? "95vh" : "100vh")};
  overflow-y: hidden;

  @media ${({ theme }) => theme.device.large} {
    object-fit: cover;
  }
`;

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  gap: 55px;

  overflow-x: scroll;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
    width: 0px;
    height: 0px;
    color: transparent;
  }

  @media ${({ theme }) => theme.device.large} {
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  text-align: center;
  color: black;
`;
