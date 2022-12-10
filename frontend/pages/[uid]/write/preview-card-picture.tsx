import React from "react";
import { useCardPicture } from "../../../stores/useCardPicture";
import { useRouter, useSearchParams } from "next/navigation";
import { Frame } from "../../../styles/components/Frame";
import styled from "styled-components";
import { WhiteLeftButton } from "../../../styles/components/Button";
import ArrowBackIcon from "../../../components/common/icons/ArrowBackIcon";

export default function index() {
  const router = useRouter();
  const userId = useSearchParams().get("uid");
  const { pictureUrl } = useCardPicture();

  const pushWriteScreen = () => {
    router.push(`/${userId}/write/write-letter`);
  };
  return (
    <Frame style={{ padding: 20 }}>
      <Header>
        <WhiteLeftButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </WhiteLeftButton>
        <Title>카드 미리보기</Title>
        <WhiteRightButton type="button" onClick={pushWriteScreen}>
          선택
        </WhiteRightButton>
      </Header>
      <PreviewDiv>{pictureUrl && <CardImage src={pictureUrl} />}</PreviewDiv>
    </Frame>
  );
}

const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
`;

const PreviewDiv = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  align-items: flex-start;

  width: 90%;
  height: 450px;
  padding: 22px 22px 111px 22px;

  background: #f7fafc;

  box-shadow: 1px 1px 8px 3px rgba(0, 0, 0, 0.25), inset 2px 2px 2px #ffffff;
  border-radius: 5px;

  @media ${({ theme }) => theme.device.large} {
    width: 358px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 5px;
  object-fit: cover;
`;

const WhiteRightButton = styled(WhiteLeftButton)`
  border-radius: 10px 10px 0px 10px;
  color: #0eca92;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;
