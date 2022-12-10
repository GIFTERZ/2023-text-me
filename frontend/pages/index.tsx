import Link from "next/link";
import { useMembers } from "../stores/useMembers";
import { useEffect } from "react";
import styled from "styled-components";
import { LeftButton, RightButton } from "../styles/components/Button";
import { Frame } from "../styles/components/Frame";
import RoomEnterForm from "../components/main/RoomEnterForm";
import { HeaderLayout } from "../styles/components/Layout";
import { useRouter } from "next/navigation";
import Logo from "../components/common/Logo";

export default function Home() {
  const router = useRouter();
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
            <LeftButton
              type="button"
              onClick={() => router.push(`/${member?.id}`)}
            >
              내 방으로 가기
            </LeftButton>
            <RightButton onClick={logout} type="button">
              로그아웃
            </RightButton>
          </>
        ) : (
          <>
            <LeftButton type="button" onClick={() => router.push("/signup")}>
              내 방 만들기
            </LeftButton>
            <RightButton type="button" onClick={() => router.push("/signin")}>
              로그인
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
