import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLetterInfo } from '../../../stores/useLetterInfo';
import { useRouter } from 'next/router';
import { Frame } from '../../../styles/components/Frame';
import { useForm } from 'react-hook-form';
import { useRoomInfo } from '../../../stores/useRoomInfo';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCardPicture } from '../../../stores/useCardPicture';
import { LeftButton } from '../../../styles/components/Button';

export default function index() {
  interface imgurl {
    imgurl: string;
  }
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
        <LetterContainer imgurl={pictureUrl} id="box">
          <ToDiv>To. 아무개</ToDiv>
          <TextArea
            id="contents"
            {...register('contents', {
              maxLength: 300,
            })}
          />
          <FromDiv>
            <p>From.</p>
            <FromInput
              id="sender"
              type="text"
              {...register('sender', {
                required: '작성자를 입력해주세요.',
                maxLength: 10,
              })}
            />
          </FromDiv>
        </LetterContainer>
        <LeftButton style={{ margin: '0 auto' }} type="submit">
          보내기
        </LeftButton>
      </form>
    </Frame>
  );
}

const LetterContainer = styled.div<{ imgurl: string }>`
  width: 100%;
  border-radius: 10px;
  margin: 70px 0;
  padding: 20px;
  position: relative;

  ::before {
    content: '';
    background: url(${props => props.imgurl});
    background-size: cover;
    border-radius: 10px;
    opacity: 0.2;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 400px;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 10px;
  position: relative;
  z-index: 5;
`;

const ToDiv = styled.div`
  margin-left: 10px;
  margin-bottom: 10px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`;

const FromDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-top: 10px;
  justify-content: end;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
`;

const FromInput = styled.input`
  height: 24px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  position: relative;
  z-index: 5;
`;
