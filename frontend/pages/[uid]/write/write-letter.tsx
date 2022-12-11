import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSendLetter } from '../../../stores/useSendLetter';
import { useRouter } from 'next/router';
import { Frame } from '../../../styles/components/Frame';
import { FieldErrors, useForm } from 'react-hook-form';
import { useRoomInfo } from '../../../stores/useRoomInfo';
import { useSearchParams } from 'next/navigation';
import { RightButton, WhiteLeftButton } from '../../../styles/components/Button';
import { useCardPicture } from '../../../stores/useCardPicture';
import { HeaderLayout, LayoutSpan } from '../../../styles/components/Layout';
import ArrowBackIcon from '../../../components/common/icons/ArrowBackIcon';
import Head from 'next/head';

type LetterForm = {
  contents: string;
  sender: string;
};

export default function index() {
  const router = useRouter();
  const userId = useSearchParams().get('uid');
  const { register, handleSubmit } = useForm<LetterForm>();

  const { pictureUrl } = useCardPicture();
  const { roomInfo, getRoomInfo } = useRoomInfo();

  const { loading, error, sendLetter } = useSendLetter();

  useEffect(() => {
    getRoomInfo(Number(userId));
  }, []);

  const pushCompletedPage = () => {
    router.push(`/${userId}/write/send-complete`);
  };

  const sendData = (data: LetterForm) => {
    const body = {
      receiverId: Number(userId),
      contents: data.contents,
      senderName: data.sender,
      imageUrl: pictureUrl,
    };
    sendLetter(body, pushCompletedPage);

    if (error) {
      alert('편지를 보내는 중 에러가 발생했습니다.');
    }
  };

  const validateData = (error: FieldErrors<LetterForm>) => {
    if (error.contents) {
      alert(error.contents.message);
      return;
    }
    if (error.sender) {
      alert(error.sender.message);
      return;
    }
  };

  return (
    <Frame>
      <Head>
        <title>편지 쓰기</title>
      </Head>

      <HeaderLayout>
        <WhiteLeftButton type="button" onClick={() => router.back()}>
          <ArrowBackIcon />
        </WhiteLeftButton>
        <Title>편지 쓰기</Title>
        <LayoutSpan />
      </HeaderLayout>
      <Form onSubmit={handleSubmit(sendData, validateData)}>
        <LetterContainer imgurl={pictureUrl} id="box">
          <ToDiv>To. {roomInfo?.userName}</ToDiv>
          <TextArea
            maxLength={300}
            {...register('contents', {
              required: '편지를 입력해주세요.',
              maxLength: {
                value: 300,
                message: '편지는 300자 이내여야 합니다.',
              },
            })}
            placeholder="편지를 입력해주세요."
          />
          <FromDiv>
            <p>From.</p>
            <FromInput
              type="text"
              placeholder="보내는 사람"
              maxLength={10}
              {...register('sender', {
                required: '보내는 사람을 입력해주세요.',
                maxLength: {
                  value: 10,
                  message: '보내는 사람 이름을 10자 이내로 입력해주세요.',
                },
              })}
            />
          </FromDiv>
        </LetterContainer>
        <RightButton type="submit" disabled={loading}>
          보내기
        </RightButton>
      </Form>
    </Frame>
  );
}

const LetterContainer = styled.div<{ imgurl: string }>`
  width: 100%;
  border-radius: 10px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 10px;
  position: relative;
  z-index: 5;

  color: #000000;

  font-family: 'GangwonEduSaeeum';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 25px;

  resize: none;

  &:focus {
    outline: none;
  }
`;

const ToDiv = styled.div`
  margin-left: 10px;
  margin-bottom: 10px;

  font-family: 'GangwonEduSaeeum';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 27px;
`;

const FromDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-top: 10px;
  justify-content: flex-end;

  font-family: 'GangwonEduSaeeum';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 27px;
`;

const Title = styled.h1`
  margin-bottom: 40px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
`;

const FromInput = styled.input`
  width: 40%;
  padding: 10px;
  height: 24px;

  position: relative;
  z-index: 5;

  border: none;
  background: none;

  font-family: 'GangwonEduSaeeum';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 27px;

  &:focus {
    outline: none;
  }
`;
