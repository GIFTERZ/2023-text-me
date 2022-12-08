import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { WhiteButton } from "../../styles/components/Button";
import MenuIcon from "./icons/MenuIcon";
import SaveContainer from "./SaveContainer";
import ShareContainer from "./ShareContainer";

function ButtonsContainer() {
  return (
    <Container className="dont-save">
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
  position: fixed;
  top: 32px;
  right: 24px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

  z-index: 10;
`;
