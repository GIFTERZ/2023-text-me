import Head from "next/head";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useCardPicture } from "../../stores/useCardPicture";
import { Frame } from "../../styles/components/Frame";
import BackHeader from "../common/BackHeader";
import CameraIcon from "./icons/CameraIcon";
import Compressor from "compressorjs";

interface Props {
  next: Function;
}

function SelectCard({ next }: Props) {
  const { setPictureUrl, constCard, getConstCard, setPictureImage } =
    useCardPicture();

  useEffect(() => {
    getConstCard();
  }, []);

  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileRef?.current?.click();
  };

  const select = (pictureUrl: string) => {
    setPictureUrl(pictureUrl);
  };

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = e;
    let file = files[0];
    new Compressor(file, {
      maxWidth: 550,
      maxHeight: 550,
      success(result) {
        file = new File([result], "image", { type: result.type });
        setPictureImage(file, () => {
          next();
        });
      },
      error() {
        setPictureImage(file, () => {
          alert("파일 업로드 중 에러가 발생했습니다.");
        });
      },
    });
  };
  return (
    <SelectFrame>
      <Head>
        <title>카드 사진 선택 - Text me!</title>
      </Head>
      <BackHeader>
        <Title>카드 선택하기</Title>
      </BackHeader>
      <PictureContainer>
        <InputDiv id="image" onClick={handleClick}>
          <CameraIcon />
        </InputDiv>
        <input
          style={{ display: "none" }}
          ref={fileRef}
          name="file"
          type="file"
          accept="image/*"
          onChange={(e) => fileUploadHandler(e)}
        />
        {constCard?.map((cards, index) => (
          <CardImage key={index} src={cards} onClick={() => select(cards)} />
        ))}
      </PictureContainer>
    </SelectFrame>
  );
}

export default SelectCard;

const SelectFrame = styled(Frame)`
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const Title = styled.h1`
  margin-bottom: 40px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
`;

const PictureContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
`;

const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;

  border-radius: 10px;
  text-align: center;
  background-color: #d9d9d9;

  box-shadow: 2px 2px 5px 1px rgba(62, 78, 82, 0.4);
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;

  border-radius: 10px;

  box-shadow: 2px 2px 5px 1px rgba(62, 78, 82, 0.4);
`;
