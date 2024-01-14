import Image from "next/image";
import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}
function BackgroundTemplate({ children }: Props) {
  return (
    <>
      {children}
      <Background
        src="/static/images/room-background.webp"
        width={1500}
        height={1000}
        alt={"크리스마스 배경"}
      />
    </>
  );
}

export default BackgroundTemplate;

const Background = styled(Image)`
  width: inherit;
  height: 100%;
  position: fixed;
  left: -700px;
  top: 0;
  overflow: hidden;
  opacity: 0.25;
  object-fit: cover;
  z-index: 0;
`;
