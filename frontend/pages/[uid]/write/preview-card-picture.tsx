import React, { useState } from 'react';
import { useCardPicture } from '../../../stores/useCardPicture';
import { useRouter } from 'next/navigation';
import PictureDatePicker from '../../../components/write/PictureDatePicker';
import { Frame } from '../../../styles/components/Frame';
import styled from 'styled-components';
import { LeftButton, RightButton, WhiteLeftButton } from '../../../styles/components/Button';
import { Input } from '../../../styles/components/Form';
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '../../../components/common/icons/ArrowBackIcon';

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
          <ArrowBackIcon />
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
      <button onClick={() => router.push('/:uid/write/select-card-picture')}></button>
    </Frame>
  );
}

const Title = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
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
  border-radius: 5px;
`;

const CommentInput = styled(Input)`
  margin-top: 20px;
  width: 100%;
  color: black;
  font-family: 'UhBeemysen', 'Cafe24Ssurround';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
`;

const WhiteRightButton = styled(WhiteLeftButton)`
  border-radius: 10px 10px 0px 10px;
  color: #0eca92;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;
