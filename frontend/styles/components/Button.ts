import styled from "styled-components";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 13px 20px;

  font-weight: 700;
  font-size: 17px;
  line-height: 17px;

  color: #ffffff;

  background: #0eca92;
  border: none;

  box-shadow: 2px 2px 5px 1px rgba(62, 78, 82, 0.4);

  &:focus {
    outline: none;
    background: #8cebb8;
    color: #0eca92;
  }
`;

const LeftButton = styled(Button)`
  border-radius: 10px 10px 10px 0px;
`;

const RightButton = styled(Button)`
  border-radius: 10px 10px 0px 10px;
`;

const WhiteButton = styled.button`
  width: 48px;
  height: 48px;

  background: #ffffff;
  border-radius: 10px 10px 0px 10px;
  border: none;

  svg {
    width: 24px;
    height: 24px;
  }

  &:focus {
    outline: none;
  }

  @media ${({ theme }) => theme.device.small} {
    width: 40px;
    height: 40px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const WhiteLeftButton = styled(WhiteButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border-radius: 10px 10px 10px 0px;
  box-shadow: 2px 2px 5px 1px rgba(62, 78, 82, 0.4);

  svg {
    width: 18px;
    height: 18px;
  }
`;

export { LeftButton, RightButton, WhiteButton, WhiteLeftButton };
