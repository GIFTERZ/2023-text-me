import React from 'react';
import styled from 'styled-components';
import { useLetterInfo } from '../../../../stores/useLetterInfo';
import { useRouter } from 'next/router';

export default function index() {
  const router = useRouter();
  const { letterContents, letterSender, setLetterContents, setLetterSender } = useLetterInfo();
  return (
    <LetterContainer>
      <h1 style={{ textAlign: 'center' }}>편지 쓰기</h1>
      <ToDiv>
        <text>To. [uid]</text>
      </ToDiv>
      <form>
        <TextArea value={letterContents} onChange={e => setLetterContents(e.target.value)} />
        <FromDiv>
          From.
          <input type={'text'} value={letterSender} onChange={e => setLetterSender(e.target.value)} />
        </FromDiv>
      </form>
      <button onClick={() => router.push('/:uid/write/send-complete')}>보내기</button>
    </LetterContainer>
  );
}

const LetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 700px;
  border: 1px solid white;
`;

const TextArea = styled.textarea`
  width: 350px;
  height: 500px;
  align-items: center;
`;

const ToDiv = styled.div`
  margin-left: 10px;
  margin-bottom: 10px;
`;

const FromDiv = styled.div`
  margin-top: 10px;
`;
