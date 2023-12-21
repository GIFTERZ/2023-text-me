import styled from "styled-components";

const Default = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;

  margin-block: 15px;

  h2 {
    margin: 0;
    font-size: 20px;
  }
  p {
    margin: 0;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  input {
    margin-block: 1px;
  }
`;

export { Default };
