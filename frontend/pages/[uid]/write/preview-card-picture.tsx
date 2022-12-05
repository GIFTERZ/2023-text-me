import React, { useState } from 'react';
import { useCardPicture } from '../../../stores/useCardPicture';
import { useRouter } from 'next/navigation';
import PictureDatePicker from '../../../components/write/PictureDatePicker';
import { Frame } from '../../../styles/components/Frame';
import styled from 'styled-components';
import { LeftButton, RightButton } from '../../../styles/components/Button';
import { Input } from '../../../styles/components/Form';
import { useForm } from 'react-hook-form';

export default function index() {
  const router = useRouter();
  const { pictureUrl, pictureDate, setPictureDate, pictureComment, setPictureComment } = useCardPicture();
  const { register, handleSubmit } = useForm();

  const pushWriteScreen = () => {
    router.push('/:uid/write/write-letter');
  };
  return (
    <Frame style={{ padding: 50 }}>
      <Header>
        <LeftButton onClick={() => router.back()}>이전</LeftButton>
        <Title>카드 확인하기</Title>
        <RightButton onClick={pushWriteScreen}>선택</RightButton>
      </Header>
      <PreviewDiv>
        {pictureUrl && <CardImage src={pictureUrl} />}
        <PictureDatePicker />
        <CommentInput
          type="text"
          placeholder="사진에 대한 한마디"
          value={pictureComment}
          {...register('comment', {
            maxLength: 28,
          })}
        />
      </PreviewDiv>
    </Frame>
  );
}

const Title = styled.h1`
  font-family: 'Cafe24Ssurround';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 24px;
  text-align: center;
`;

const PreviewDiv = styled.div`
  margin-top: 3rem;
  width: 100%;
  padding: 50px;
  border: 1px solid white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardImage = styled.img`
  height: 100%;
  width: 100%;
`;

const CommentInput = styled(Input)`
  margin-top: 20px;
  width: 100%;
  color: black;
  font-family: 'Cafe24Ssurround';
`;
