import Link from "next/link";
import { useMembers } from "../stores/useMembers";
import { useEffect, useState } from "react";
import styled from "styled-components";
import RoomEnterForm from "../components/main/RoomEnterForm";
import { LeftButton, RightButton } from "../styles/components/Button";
import { Frame } from "../styles/components/Frame";

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
          <Link href={`/${member?.id}`}>
            <LeftButton type="button">내 방으로 가기</LeftButton>
          </Link>
        ) : (
          <>
            <Link href={"/signup"}>
              <LeftButton type="button">내 방 만들기</LeftButton>
            </Link>
            <Link href={"/signin"}>
              <RightButton type="button">로그인</RightButton>
            </Link>
          </>
        )}
      </ButtonsContainer>
    </Frame>
  );
}

const Title = styled.h1`
  margin-bottom: 40px;

  font-family: "Cafe24Ssurround";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;

  color: #222222;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin-top: 158px;

  width: 100%;

  ${LeftButton}, ${RightButton} {
    width: 100%;
  }
`;
