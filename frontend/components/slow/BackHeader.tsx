import React from "react";
import styled from "styled-components";
import BackHeader from "../common/BackHeader";
import Logo from "../common/Logo";
interface Props {
  onBackClick: Function;
}
function SlowBackHeader({ onBackClick }: Props) {
  return (
    <HeaderContainer>
      <BackHeader onBackClick={() => onBackClick()}>
        <Logo />
      </BackHeader>
    </HeaderContainer>
  );
}

export default SlowBackHeader;

const HeaderContainer = styled.div`
  position: relative;
  z-index: 2;
  padding: 20px;
`;
