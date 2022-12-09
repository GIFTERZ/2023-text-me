import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { WhiteButton } from "../../styles/components/Button";
import HomeIcon from "./icons/HomeIcon";
import MenuIcon from "./icons/MenuIcon";
import SaveContainer from "./SaveContainer";
import ShareContainer from "./ShareContainer";

function ButtonsContainer() {
  const [isUser] = useState(false);
  return (
    <Container className="dont-save">
      {isUser ? (
        <Link href="/mypage">
          <WhiteButton type="button">
            <MenuIcon />
          </WhiteButton>
        </Link>
      ) : (
        <Link href="/">
          <WhiteButton type="button">
            <HomeIcon />
          </WhiteButton>
        </Link>
      )}
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
