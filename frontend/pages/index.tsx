import Link from "next/link";
import { useMembers } from "../stores/useMembers";
import { useEffect } from "react";
import styled from "styled-components";
import {
  LeftButton,
  RightButton,
  WhiteLeftButton,
} from "../styles/components/Button";
import { Frame } from "../styles/components/Frame";
import RoomEnterForm from "../components/main/RoomEnterForm";
import { HeaderLayout, LayoutSpan } from "../styles/components/Layout";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "../components/common/icons/ArrowBackIcon";
import Logo from "../components/common/Logo";

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
      <HeaderLayout style={{ justifyContent: "center" }}>
        <Logo />
      </HeaderLayout>
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
