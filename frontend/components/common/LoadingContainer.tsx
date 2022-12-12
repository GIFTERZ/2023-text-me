import React from "react";
import styled from "styled-components";
import { Spinner } from "../../styles/indicators/Loader";
import DeferredComponent from "./DeferredComponent";

interface Props {
  height?: string;
}

function LoadingContainer({ height }: Props) {
  return (
    <DeferredComponent>
      <Container style={{ height }}>
        <Spinner />
      </Container>
    </DeferredComponent>
  );
}

export default LoadingContainer;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
`;
