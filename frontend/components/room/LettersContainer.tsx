import React, { useEffect } from "react";
import styled from "styled-components";
import { useLetters } from "../../stores/useLetters";
import { Spinner } from "../../styles/indicators/Loader";
import DeferredComponent from "../common/DeferredComponent";
import Letter from "./Letter";

interface Props {
  userId: number;
}

function LettersContainer({ userId }: Props) {
  const { error, letters, getLetters } = useLetters();
  useEffect(() => {
    getLetters(userId);
  }, []);

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
      <Row>
        {letters?.slice(0, Math.ceil(letters.length / 2)).map((letter) => (
          <Letter letter={letter} />
        ))}
      </Row>
      <Row>
        {letters?.slice(Math.ceil(letters.length / 2)).map((letter) => (
          <Letter letter={letter} />
        ))}
      </Row>
    </Container>
  );
}

export default LettersContainer;

const Row = styled.div`
  width: fit-content;

  display: flex;
  gap: 25px;

  @media ${({ theme }) => theme.device.small} {
    gap: 15px;
  }
`;

const Container = styled.div`
  position: absolute;
  width: 100vw;
  left: 0;
  top: 180px;

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

  ${Row}:last-child {
    margin: 0 50px;
  }

  @media ${({ theme }) => theme.device.large} {
    width: 480px;
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
