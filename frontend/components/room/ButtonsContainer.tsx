import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { WhiteButton } from "../../styles/components/Button";
import MenuIcon from "./icons/MenuIcon";
import SaveContainer from "./SaveContainer";
import ShareContainer from "./ShareContainer";

function ButtonsContainer() {
  return (
    <Container>
      {/* To do: 비로그인 구분 */}
      <Link href="/">
        <WhiteButton type="button">
          <MenuIcon />
        </WhiteButton>
      </Link>
      <SaveContainer />
      <ShareContainer />
    </Container>
  );
}

export default ButtonsContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
