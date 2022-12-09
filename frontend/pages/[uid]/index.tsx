import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import LettersContainer from "../../components/room/LettersContainer";
import LetterViewContainer from "../../components/room/LetterViewContainer";
import { useRoomInfo } from "../../stores/useRoomInfo";
import styled from "styled-components";
import ButtonsContainer from "../../components/room/ButtonsContainer";
import { RightButton } from "../../styles/components/Button";
import PlusIcon from "../../components/room/icons/PlusIcon";
import { useCaptureMode } from "../../stores/useCaptureMode";
import SaveModal from "../../components/room/SaveModal";

function Room() {
  const { get } = useSearchParams();
  const pathname = usePathname();

  const userId = Number(get("uid"));

  const { roomInfo, getRoomInfo } = useRoomInfo();
  const { isCaptureMode, toggleCaptureMode, modalOpen } = useCaptureMode();

  useEffect(() => {
    getRoomInfo(userId);
  }, []);

  return (
    <>
      <Header>
        <Title>{roomInfo?.userName}'s room</Title>
        {!isCaptureMode && <ButtonsContainer />}
      </Header>
      <LettersContainer userId={userId} />
      {!isCaptureMode && (
        <Link href={`${pathname}/write/select-card-picture`}>
          <CTAButton>
            TEXT <br />
            {roomInfo?.userName}
          </CTAButton>
        </Link>
      )}
      <LetterViewContainer />
      {modalOpen && <SaveModal />}
      {isCaptureMode && (
        <CaptureModeButton type="button" onClick={toggleCaptureMode}>
          캡처 모드 종료
        </CaptureModeButton>
      )}
    </>
  );
}

export default Room;

const Title = styled.h1`
  position: fixed;
  top: 32px;
  left: 24px;

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

  z-index: 10;

  box-shadow: 2px 2px 5px 1px rgba(62, 78, 82, 0.4),
    inset -2px -2px 3px rgba(106, 106, 106, 0.25),
    inset 2px 2px 3px rgba(255, 255, 255, 0.5);

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

  box-shadow: 2px 2px 5px 1px rgba(62, 78, 82, 0.4),
    inset -2px -2px 3px rgba(106, 106, 106, 0.25),
    inset 2px 2px 3px rgba(255, 255, 255, 0.5);

  @media ${({ theme }) => theme.device.small} {
    font-size: 12px;
    padding: 8px 16px;
  }
`;

const CaptureModeButton = styled(RightButton)`
  position: fixed;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 5vh;
  margin: 10px auto;
  border-radius: 0;
`;
