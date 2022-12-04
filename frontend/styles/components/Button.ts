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

export { LeftButton, RightButton };
