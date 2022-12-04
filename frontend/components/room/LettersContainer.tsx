import React, { useEffect } from "react";
import styled from "styled-components";
import { useLetters } from "../../stores/useLetters";
import { useLetterView } from "../../stores/useLetterView";

interface Props {
  userId: number;
}

function LettersContainer({ userId }: Props) {
  const { isLoading, error, letters, getLetters } = useLetters();
  const { open } = useLetterView();

  useEffect(() => {
    getLetters(userId);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <Container>
      <Row>
        {letters.slice(0, Math.ceil(letters.length / 2)).map((letter) => (
          <Card key={letter.id} onClick={() => open(letter.id)}>
            <CardImg src={letter.cardImg} />
          </Card>
        ))}
      </Row>
      <Row>
        {letters.slice(Math.ceil(letters.length / 2)).map((letter) => (
          <Card key={letter.id} onClick={() => open(letter.id)}>
            <CardImg src={letter.cardImg} />
          </Card>
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
    width: 0px;
    height: 0px;
    color: none;
  }

  ${Row}:last-child {
    margin: 0 50px;
  }
`;

const Card = styled.div`
  width: 97px;
  height: 120px;
  padding: 6px 6px 30px 6px;

  background: white;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25),
    inset 2px 2px 2px rgba(184, 188, 189, 0.4);
  border-radius: 5px;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  border-radius: 5px;
`;
