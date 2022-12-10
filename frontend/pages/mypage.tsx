import Link from "next/link";
import React, { useEffect } from "react";
import NicknameContainer from "../components/mypage/NicknameContainer";
import { useMembers } from "../stores/useMembers";
import styled from "styled-components";

function Mypage() {
  const { isLoading, error, member, getMember } = useMembers();

  useEffect(() => {
    getMember();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <Frame>
      <NicknameContainer />
      <Link href={`/${member?.id}`}>내 방으로 가기</Link>
      <Link href={"/"}>다른 사람 방 구경하기</Link>
    </Frame>
  );
}

export default Mypage;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;

  padding: 70px 30px;
`;
