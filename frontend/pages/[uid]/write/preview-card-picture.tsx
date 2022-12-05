import React, { useState } from 'react';
import { useCardPicture } from '../../../stores/useCardPicture';
import { useRouter } from 'next/navigation';
import PictureDatePicker from '../../../components/write/PictureDatePicker';
import { Frame } from '../../../styles/components/Frame';
import styled from 'styled-components';
import { LeftButton, RightButton, WhiteButton } from '../../../styles/components/Button';
import { Input } from '../../../styles/components/Form';
import { useForm } from 'react-hook-form';
import { MdArrowBackIosNew } from 'react-icons/md';

export default function index() {
  const router = useRouter();
  const { pictureUrl, pictureDate, setPictureDate, pictureComment, setPictureComment } = useCardPicture();
  const { register, handleSubmit } = useForm();

  const pushWriteScreen = () => {
    router.push('/:uid/write/write-letter');
  };
  return (
    <Frame style={{ padding: 20 }}>
      <Header>
        <WhiteLeftButton style={{ backgroundColor: 'white' }} onClick={() => router.back()}>
          <MdArrowBackIosNew size={30} />
        </WhiteLeftButton>
        <Title>카드 선택하기</Title>
        <WhiteRightButton style={{ backgroundColor: 'white' }} type="submit" onClick={handleSubmit(pushWriteScreen)}>
          선택
        </WhiteRightButton>
      </Header>
      <PreviewDiv>
        {pictureUrl && <CardImage src={pictureUrl} />}
        <PictureDatePicker />
        <CommentInput
          type="text"
          placeholder="사진에 대한 한마디"
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
  padding: 30px;
  border: 1px solid white;
  border-radius: 10px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 10px;
`;

const CommentInput = styled(Input)`
  margin-top: 20px;
  width: 100%;
  color: black;
  font-family: 'Cafe24Ssurround';
`;

const WhiteLeftButton = styled(LeftButton)`
  background-color: white;
  color: #0eca92;
`;
const WhiteRightButton = styled(RightButton)`
  background-color: white;
  color: #0eca92;
`;
