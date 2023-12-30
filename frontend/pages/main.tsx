import React from "react";
import styled from "styled-components";
import { RightButton } from "../styles/components/Button";
import { useRouter } from "next/navigation";

function main() {
  const router = useRouter();
  return (
    <>
      <BackgroundImage>
        <TextContainer>
          <Head>
            1년뒤의 나에게
            <br />
            <Green>편지</Green>를 보내보세요
          </Head>
          <Sub>
            오늘 나에게 편지를 보내면
            <br />
            2024년 12월 31일
            <br />
            에 다시 나에게 돌아와요.
            <br />
            바쁘게 달려온 올 한 해를 돌아보고
            <br />
            내년의 나 자신에게
            <br />
            하고싶은 말을 적어보며
            <br />
            2023년을 마무리해보아요.
          </Sub>
        </TextContainer>
        <Button onClick={() => router.push("/getInfo")}>나에게 편지 쓰러 가기</Button>
      </BackgroundImage>
    </>
  );
}

export default main;

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  overflow: hidden;
  ::after {
    width: 100%;
    height: 100%;
    content: "";
    background: url("/static/images/room-background.png");
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.3;
    overflow: hidden;
  }
`;

// const BackgroundImage = styled(Image)`
//   position: absolute;
//   overflow: hidden;
//   opacity: 0.3;
//   ::after {
//     content: "";

//   }
// `;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
`;

const Head = styled.p`
  font-size: 48px;
  font-weight: 800;
  text-align: center;
`;

const Sub = styled.p`
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
  text-align: center;
`;

const Button = styled(RightButton)`
  width: 100%;
  margin-top: 5rem;
`;

const Green = styled.span`
  color: #2db674;
`;
