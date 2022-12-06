import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

function Layout(props: Props) {
  return <Container>{props.children}</Container>;
}

export default Layout;

const Container = styled.div`
  height: 100vh;
  background-color: white;

  @media ${({ theme }) => theme.device.large} {
    width: 480px;
    margin: 0 auto;
  }
`;
