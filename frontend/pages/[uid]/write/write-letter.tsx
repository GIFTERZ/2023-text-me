import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLetterInfo } from '../../../stores/useLetterInfo';
import { useRouter } from 'next/router';
import { Frame } from '../../../styles/components/Frame';
import { useForm } from 'react-hook-form';
import { useRoomInfo } from '../../../stores/useRoomInfo';
import { usePathname, useSearchParams } from 'next/navigation';
// import '../../../styles/cardBackground.css';
import { useCardPicture } from '../../../stores/useCardPicture';

export default function index() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { setLetterContents, setLetterSender } = useLetterInfo();
  const sendData = (data: object) => {
    console.log(data);
    router.push('/:uid/write/send-complete');
  };

  const { get } = useSearchParams();
  const pathname = usePathname();
  const userId = Number(get('uid'));

  const { pictureUrl } = useCardPicture();
  const { roomInfo, getRoomInfo } = useRoomInfo();
  useEffect(() => {
    getRoomInfo(userId);
  }, []);

  return (
    <Frame>
      <Title>편지 쓰기</Title>
      {/* <ToDiv>{roomInfo.ownerName && <p>To. {roomInfo.ownerName}</p>}</ToDiv> */}
      <form onSubmit={handleSubmit(sendData)}>
        <div id="box" style={{ backgroundImage: `url(${pictureUrl})` }}>
          <TextArea
            id="contents"
            {...register('contents', {
              maxLength: 300,
            })}
          />
          <FromDiv>
            From.
            <input
              id="sender"
              type="text"
              {...register('sender', {
                required: '작성자를 입력해주세요.',
                maxLength: 10,
              })}
            />
          </FromDiv>
        </div>
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
  background-color: transparent;
`;

const ToDiv = styled.div`
  margin-left: 10px;
  margin-bottom: 10px;
`;

const FromDiv = styled.div`
  margin-top: 10px;
`;

const Title = styled.h1`
  font-family: 'Cafe24Ssurround';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 24px;
  text-align: center;
`;
