import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

function Background(props: Props) {
  return <Container>{props.children}</Container>;
}

export default Background;

const Container = styled.div`
  background: url(static/images/room-background.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
