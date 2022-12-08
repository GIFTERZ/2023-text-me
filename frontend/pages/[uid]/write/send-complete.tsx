import React, { useState } from 'react';
import styled from 'styled-components';
import { useCardPicture } from '../../../stores/useCardPicture';
import { Frame } from '../../../styles/components/Frame';
import { LeftButton, RightButton } from '../../../styles/components/Button';
import { useRoomInfo } from '../../../stores/useRoomInfo';
import Link from 'next/link';

export default function index() {
  const [isUser] = useState(true);

  const { pictureUrl } = useCardPicture();
  const { roomInfo } = useRoomInfo();

  const textLimitChangeLine = (nickname: string) => {
    if (nickname?.length < 7) {
      return <p>{nickname}님께 편지를 보냈어요</p>;
    } else {
      return (
        <p>
          {nickname}님께
          <br />
          편지를 보냈어요
        </p>
      );
    }
  };

  return (
    <Frame>
      <Container>
        <Title>{textLimitChangeLine(roomInfo?.userName)}</Title>
        {pictureUrl && <CardImage src={pictureUrl} />}
        <div>
          {!isUser && (
            <LeftButton>
              <Link href="/singup">내 방 만들기</Link>
            </LeftButton>
          )}
          <RightButton>
            <Link href={`/${roomInfo?.id}`}>확인하기</Link>
          </RightButton>
        </div>
      </Container>
    </Frame>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;

  margin-top: 20px;

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
  margin: 0;

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
`;
