import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import LettersContainer from "../../components/room/LettersContainer";
import LetterViewContainer from "../../components/room/LetterViewContainer";
import { useRoomInfo } from "../../stores/useRoomInfo";
import Background from "../../components/room/Background";
import styled from "styled-components";
import ButtonsContainer from "../../components/room/ButtonsContainer";
import { RightButton } from "../../styles/components/Button";
import PlusIcon from "../../components/room/icons/PlusIcon";

function Room() {
  const { get } = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const userId = Number(get("uid"));

  const { roomInfo, getRoomInfo } = useRoomInfo();
  const [isUser] = useState(false);

  useEffect(() => {
    getRoomInfo(userId);
  }, []);

  const enterRegister = () => {
    const confirm = window.confirm("내 방을 만드시겠습니까?");

    if (confirm) {
      router.push("/signup");
    }
  };

  return (
    <Background>
      <Frame>
        <Header>
          <Title>{roomInfo?.ownerName}'s room</Title>
          <ButtonsContainer />
        </Header>
        <LettersContainer userId={userId} />
        <Link href={`${pathname}/write/select-card-picture`}>
          <CTAButton className="dont-save">
            TEXT <br />
            {roomInfo?.ownerName}
          </CTAButton>
        </Link>
        {!isUser && <PlusIcon onClick={enterRegister} />}
        <LetterViewContainer />
      </Frame>
    </Background>
  );
}

export default Room;

const Frame = styled.div`
  padding: 32px 24px;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 13px;

  width: fit-content;
  height: 48px;

  margin: 0;

  background: #ffffff;
  border-radius: 10px 10px 10px 0px;

  font-weight: 700;
  font-size: 17px;
  line-height: 17px;

  color: #0eca92;

  box-shadow: 2px 2px 5px 1px rgba(62, 78, 82, 0.4);

  @media ${({ theme }) => theme.device.small} {
    font-size: 14px;
    padding: 13px;
    height: 40px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CTAButton = styled(RightButton)`
  position: fixed;
  left: 50%;
  bottom: 8%;
  transform: translate(-50%, -50%);

  padding: 13px 24px;

  @media ${({ theme }) => theme.device.small} {
    font-size: 12px;
    padding: 8px 16px;
  }
`;
