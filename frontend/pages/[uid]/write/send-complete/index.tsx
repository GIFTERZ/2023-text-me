import React from 'react';
import styled from 'styled-components';
import { useCardPicture } from '../../../../stores/useCardPicture';

export default function index() {
  const { pictureUrl } = useCardPicture();

  return (
    <Container>
      <h1>[uid]님께 편지를 보냈어요</h1>
      {pictureUrl && <img src={pictureUrl} style={{ width: 200, height: 350, borderRadius: 10 }} />}
      <button>내방 만들기</button>
      <button>확인하기</button>
    </Container>
  );
}

const Container = styled.div`
  width: 400px;
  height: 800px;
  border: 1px solid black;
  text-align: center;
`;
