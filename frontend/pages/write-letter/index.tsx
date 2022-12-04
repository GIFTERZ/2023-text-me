import React, { useRef, useState } from 'react';
import styled from 'styled-components';

export default function index() {
  return (
    <LetterContainer>
      <h1>편지 쓰기</h1>
      <h4>To. 닉네임</h4>
      <form>
        <TextArea />
        <FromDiv>
          To.
          <input type={'text'} />
        </FromDiv>
      </form>
    </LetterContainer>
  );
}

const LetterContainer = styled.div`
  width: 400px;
  height: 1000px;
  border: 1px solid white;
`;

const TextArea = styled.textarea`
  width: 350px;
  height: 800px;
`;

const FromDiv = styled.div`
  right: 0;
`;
