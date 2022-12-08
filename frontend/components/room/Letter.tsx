import React from 'react';
import styled from 'styled-components';
import { useLetterView } from '../../stores/useLetterView';
import { Letter } from '../../types';

interface Props {
  letter: Letter;
}

function LetterComponent({ letter }: Props) {
  const { open } = useLetterView();

  return (
    <Card onClick={() => open(letter.id)}>
      <CardImg src={letter.imageUrl} />
    </Card>
  );
}

export default LetterComponent;

const Card = styled.div`
  width: 97px;
  height: 120px;
  padding: 6px 6px 30px 6px;

  background: white;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25), inset 2px 2px 2px rgba(184, 188, 189, 0.4);
  border-radius: 5px;

  @media ${({ theme }) => theme.device.small} {
    width: 80px;
    height: 100px;
    padding: 5px 5px 20px 5px;
  }
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  border-radius: 5px;
`;
