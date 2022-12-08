import styled from "styled-components";

const FormTitle = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 17px;

  color: #222222;
`;

const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  color: #222222;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  color: #222222;
`;

const Input = styled.input`
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

export { FormTitle, Description, InputContainer, Input };
