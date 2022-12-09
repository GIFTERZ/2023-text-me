import Link from 'next/link';
import { useMembers } from '../stores/useMembers';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import RoomEnterForm from '../components/main/RoomEnterForm';
import { LeftButton, RightButton } from '../styles/components/Button';
import { Frame } from '../styles/components/Frame';
import { Title } from '../styles/components/Title';
import { getCookie } from '../components/common/Cookie';

export default function Home() {
  const { member, getMember, logoutMember } = useMembers();

  const logout = () => {
    logoutMember();
  };

  useEffect(() => {
    getMember();
  }, []);

  return (
    <Frame>
      <Title>Text me!</Title>
      <RoomEnterForm />
      <ButtonsContainer>
        {member?.id ? (
          <>
            <LeftButton type="button">
              <Link href={`/${member?.id}`}>내 방으로 가기</Link>
            </LeftButton>
            <RightButton onClick={logout} type="button">
              로그아웃
            </RightButton>
          </>
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
