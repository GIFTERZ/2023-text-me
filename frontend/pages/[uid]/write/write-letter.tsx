import React from 'react';
import styled from 'styled-components';
import { useLetterInfo } from '../../../stores/useLetterInfo';
import { useRouter } from 'next/router';
import { Frame } from '../../../styles/components/Frame';
import { useForm } from 'react-hook-form';
import { useRoomInfo } from '../../../stores/useRoomInfo';

export default function index() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { setLetterContents, setLetterSender } = useLetterInfo();
  const sendData = (data: object) => {
    console.log(data);
    router.push('/:uid/write/send-complete');
  };
  const { roomInfo } = useRoomInfo();
  return (
    <Frame>
      <h1 style={{ textAlign: 'center' }}>편지 쓰기</h1>
      <ToDiv>
        {/* {roomInfo.ownerName && <p>To. {roomInfo.ownerName}</p>} 
        오류나서 일단 주석 처리 해놨습니다
        */}
      </ToDiv>
      <form onSubmit={handleSubmit(sendData)}>
        <TextArea id="contents" {...register('contents')} />
        <FromDiv>
          From.
          <input id="sender" type="text" {...register('sender')} />
        </FromDiv>
        <button type="submit">보내기</button>
      </form>
    </Frame>
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
  width: 100%;
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
