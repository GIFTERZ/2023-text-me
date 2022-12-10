import Link from "next/link";
import { useMembers } from "../stores/useMembers";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  LeftButton,
  RightButton,
  WhiteLeftButton,
} from "../styles/components/Button";
import { Frame } from "../styles/components/Frame";
import { Title } from "../styles/components/Title";
import RoomEnterForm from "../components/main/RoomEnterForm";
import { HeaderLayout, LayoutSpan } from "../styles/components/Layout";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "../components/common/icons/ArrowBackIcon";
import Logo from "../components/common/Logo";

export default function Home() {
  const [isUser] = useState(false);

  const router = useRouter();

  const { member, getMember } = useMembers();

  useEffect(() => {
    getMember();
  }, []);

  return (
    <Frame>
      <HeaderLayout>
        <WhiteLeftButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </WhiteLeftButton>
        <Logo />
        <LayoutSpan aria-hidden />
      </HeaderLayout>
      <RoomEnterForm />
      <ButtonsContainer>
        {isUser ? (
          <LeftButton type="button">
            <Link href={`/${member?.id}`}>내 방으로 가기</Link>
          </LeftButton>
        ) : (
          <>
            <LeftButton type="button">
              <Link href={"/signup"}>내 방 만들기</Link>
            </LeftButton>
            <RightButton type="button">
              <Link href={"/signin"}>로그인</Link>
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
