import Head from "next/head";
import Image from "next/image";
import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}
function BackgroundTemplate({ children }: Props) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          fetchpriority="high"
          as="image"
          href="/static/images/room-background.webp"
        />
      </Head>
      <Background>{children}</Background>
    </>
  );
}

export default BackgroundTemplate;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("/static/images/room-background.webp");
  background-position: 50%;
  background-size: auto 100%;
`;
