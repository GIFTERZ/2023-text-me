import { useMembers } from "../stores/useMembers";
import { useEffect } from "react";
import styled from "styled-components";
import { LeftButton, RightButton } from "../styles/components/Button";
import { Frame } from "../styles/components/Frame";
import RoomEnterForm from "../components/main/RoomEnterForm";
import { HeaderLayout } from "../styles/components/Layout";
import { useRouter } from "next/navigation";
import Logo from "../components/common/Logo";
import Head from "next/head";

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
      <Head>
        <title>Text me!</title>
      </Head>

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
            <RightButton type="button" onClick={() => router.push("/signin")}>
              로그인하고 내 방으로 가기
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

  width: 100%;

  margin-top: 50px;

  ${LeftButton} {
    width: 100%;
  }

  ${RightButton} {
    width: 100%;
  }
`;
