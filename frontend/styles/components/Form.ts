import styled from "styled-components";

const Label = styled.label`
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 17px;

  color: #222222;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Input = styled.input`
  padding: 13px 20px;

  font-size: 17px;
  line-height: 20px;

  background: #f0f0f0;
  border-radius: 10px 10px 10px 0px;
  border: none;

  &:focus {
    outline: none;
  }
`;

export { Label, InputContainer, Input };
