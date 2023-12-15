import styled from "styled-components";

const DefaultLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;

  color: #222222;
`;

const DefaultInput = styled.input`
  width: 100%;

  padding: 13px 20px;

  font-size: 17px;
  line-height: 20px;

  background: #f0f0f0;
  border-radius: 10px 10px 10px 0px;
  border: none;

  color: #222222;

  &::placeholder {
    color: #9e9e9e;
  }

  &:focus {
    outline: none;
  }
`;

export { DefaultLabel, DefaultInput };
