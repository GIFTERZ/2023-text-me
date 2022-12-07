import React from 'react';
import styled from 'styled-components';
import { useCardPicture } from '../../../stores/useCardPicture';
import { Frame } from '../../../styles/components/Frame';
import { LeftButton, RightButton } from '../../../styles/components/Button';

export default function index() {
  const { pictureUrl } = useCardPicture();
  const nickname_long = '가나다라마바사아자차카';
  const nickname_short = '승현이';
  const textLimitChangeLine = (nickname: string) => {
    if (nickname.length < 7) {
      return <p>{nickname}님께 편지를 보냈어요</p>;
    } else {
      return (
        <>
          <p>{nickname}님께</p>
          <p>편지를 보냈어요</p>
        </>
      );
    }
  };

  return (
    <Frame>
      <Container>
        <Title>{textLimitChangeLine(nickname_short)}</Title>
        {pictureUrl && <CardImage src={pictureUrl} />}
        <LeftButton>내방 만들기</LeftButton>
        <RightButton>확인하기</RightButton>
      </Container>
    </Frame>
  );
}

const Container = styled.div`
  text-align: center;
  ${LeftButton} {
    width: 180px;
    height: 40px;
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 17px;
    color: white;
    margin: 0 auto;
  }
  ${RightButton} {
    width: 180px;
    height: 40px;
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 17px;
    color: white;
    margin: 17px auto;
  }
`;

const Title = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 17px;
  text-align: center;
`;

const CardImage = styled.img`
  width: 140px;
  height: 175px;
  border-radius: 10px;
  margin-bottom: 30px;
`;
