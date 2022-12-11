import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

function Layout(props: Props) {
  const router = useRouter();
  if (router.pathname === "/[uid]") {
    return <>{props.children}</>;
  }
  return <Container>{props.children}</Container>;
}

export default Layout;

const Container = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  background-color: white;

  @media ${({ theme }) => theme.device.large} {
    width: 480px;
    margin: 0 auto;
  }
`;
