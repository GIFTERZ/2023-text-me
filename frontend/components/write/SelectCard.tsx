import Head from "next/head";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useCardPicture } from "../../stores/useCardPicture";
import { Frame } from "../../styles/components/Frame";
import BackHeader from "../common/BackHeader";
import CameraIcon from "./icons/CameraIcon";
import Compressor from "compressorjs";
import { cardAlt } from "../../public/static/images/card-alt";
import Image from "next/image";

interface Props {
  type: "UPLOAD" | "SELECT";
  next: Function;
}

function SelectCard({ type, next }: Props) {
  const { setPictureUrl, constCard, setConstCard, setPictureImage } =
    useCardPicture();

  useEffect(() => {
    return setConstCard(
      Array.from({ length: 4 }, () => "/static/images/card").map((v, i) => {
        return { src: `${v}-${i + 1}.webp`, alt: cardAlt[`card-${i + 1}`] };
      })
    );
  }, []);

  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileRef?.current?.click();
  };

  const select = (pictureUrl: string) => {
    setPictureUrl(pictureUrl);
    next();
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
        <link
          rel="preload"
          fetchpriority="high"
          as="image"
          href="/static/images/card-1.webp"
        />
        <link
          rel="preload"
          fetchpriority="high"
          as="image"
          href="/static/images/card-2.webp"
        />
        <link
          rel="preload"
          fetchpriority="high"
          as="image"
          href="/static/images/card-3.webp"
        />
        <link
          rel="preload"
          fetchpriority="high"
          as="image"
          href="/static/images/card-4.webp"
        />
      </Head>
      <BackHeader>
        <Title>카드 선택하기</Title>
      </BackHeader>
      <PictureContainer>
        {type === "UPLOAD" && (
          <>
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
          </>
        )}
        {constCard?.map((card, index) => (
          <CardImage
            key={index}
            src={card.src}
            onClick={() => select(card.src)}
            alt={`${card.alt}`}
            width={272}
            height={272}
          />
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

const CardImage = styled(Image)`
  width: 100%;
  height: auto;

  border-radius: 10px;

  box-shadow: 2px 2px 5px 1px rgba(62, 78, 82, 0.4);

  cursor: pointer;
`;
