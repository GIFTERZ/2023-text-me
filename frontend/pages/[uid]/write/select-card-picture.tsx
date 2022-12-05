import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Router from 'next/router';
import { useCardPicture } from '../../../stores/useCardPicture';
import { LeftButton } from '../../../styles/components/Button';
import { Frame } from '../../../styles/components/Frame';
import styled from 'styled-components';
import CameraIcon from 'static/images/icon-camera.png';
import { url } from 'inspector';

export default function index() {
  const { pictureUrl, setPictureUrl } = useCardPicture();
  const router = useRouter();
  const [selectedPicture, setSelectedPicture] = useState<File | null>();
  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileRef?.current?.click();
  };

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    setSelectedPicture(target.files[0]);
    console.log('URL:' + URL.createObjectURL(target.files[0]));
    setPictureUrl(URL.createObjectURL(target.files[0]));
  };

  const sendFile = () => {
    router.push('/:uid/write/preview-card-picture');
  };

  return (
    <Frame>
      <Title>카드 선택하기</Title>
      <PictureContainer>
        <form>
          {pictureUrl ? (
            <CardImage id="image" onClick={handleClick} src={pictureUrl} />
          ) : (
            <InputDiv id="image" onClick={handleClick}></InputDiv>
          )}
          <input style={{ display: 'none' }} ref={fileRef} name="file" type="file" accept="image/*" onChange={e => fileUploadHandler(e)} />
        </form>
        <CardImage src={pictureUrl} />
        <CardImage />
        <CardImage />
        <CardImage />
        <CardImage />
      </PictureContainer>
      <LeftButton style={{ width: '100%' }} onClick={sendFile}>
        선택하기
      </LeftButton>
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

const PictureContainer = styled.div`
  height: 80vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
`;

const InputDiv = styled.div`
  border: 1px solid white;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  text-align: center;
  background: url(static/images/icon-camera.png);
  background-color: #d9d9d9;
`;

const CardImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 10px;
`;
