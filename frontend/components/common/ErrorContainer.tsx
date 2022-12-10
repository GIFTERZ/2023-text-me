import styled from "styled-components";
import React from "react";
import Link from "next/link";
import { RightButton } from "../../styles/components/Button";
interface Props {
  text?: string;
}
function ErrorContainer({ text }: Props) {
  return (
    <Container>
      {text ? text : "존재하지 않는 페이지입니다."}
      <Link href="/">
        <RightButton type="button">메인으로</RightButton>
      </Link>
    </Container>
  );
}

export default ErrorContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;

  height: 100vh;
`;
