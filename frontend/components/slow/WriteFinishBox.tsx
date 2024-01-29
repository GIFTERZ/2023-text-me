import React from "react";
import styled from "styled-components";

const TextBox = () => {
  const text = "작성하신 편지는\n2024년 12월 31일에\n정성스럽게 보내드릴게요.";
  return (
    <Wrapper>
      <h2>편지 작성이 완료되었어요.</h2>
      <p>{text}</p>
    </Wrapper>
  );
};

function WriteFinishBox() {
  return (
    <Wrapper>
      <TextBox />
    </Wrapper>
  );
}

export default WriteFinishBox;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
