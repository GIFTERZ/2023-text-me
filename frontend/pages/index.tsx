import Link from 'next/link';
import { useMembers } from '../stores/useMembers';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import RoomEnterForm from '../components/main/RoomEnterForm';
import { LeftButton, RightButton } from '../styles/components/Button';
import { Frame } from '../styles/components/Frame';

export default function Home() {
  const [isUser] = useState(false);

  const { member, getMember } = useMembers();

  useEffect(() => {
    getMember();
  }, []);

  return (
    <Frame>
      <Title>Text me!</Title>
      <RoomEnterForm />
      <ButtonsContainer>
        {isUser ? (
          <LeftButton type="button">
            <Link href={`/${member?.id}`}>내 방으로 가기</Link>
          </LeftButton>
        ) : (
          <>
            <LeftButton type="button">
              <Link href={'/signup'}>내 방 만들기</Link>
            </LeftButton>
            <RightButton type="button">
              <Link href={'/signin'}>로그인</Link>
            </RightButton>
          </>
        )}
      </ButtonsContainer>
    </Frame>
  );
}

const Title = styled.h1`
  margin-bottom: 40px;

  font-family: 'Cafe24Ssurround';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;

  color: #222222;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;

  margin-top: 158px;

  width: 100%;

  ${LeftButton} {
    width: 100%;
  }

  ${RightButton} {
    width: 100%;
  }
`;
