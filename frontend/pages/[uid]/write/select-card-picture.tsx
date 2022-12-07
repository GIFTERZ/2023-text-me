import React, { useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCardPicture } from "../../../stores/useCardPicture";
import { Frame } from "../../../styles/components/Frame";
import styled from "styled-components";
import CameraIcon from "../../../components/write/icons/CameraIcon";

export default function index() {
  const router = useRouter();
  const userId = useSearchParams().get("uid");
  const { setPictureUrl, constCard, getConstCard } = useCardPicture();

  useEffect(() => {
    getConstCard();
  }, []);

  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileRef?.current?.click();
  };

  const select = (pictureUrl: string) => {
    setPictureUrl(pictureUrl);
    router.push(`/${userId}/write/preview-card-picture`);
  };

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget: target } = e;
    select(URL.createObjectURL(target.files[0]));
  };

  return (
    <SelectFrame>
      <Title>카드 선택하기</Title>
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
        {constCard?.map((cards) => (
          <CardImage
            key={cards.id}
            src={cards.cardUrl}
            onClick={() => select(cards.cardUrl)}
          />
        ))}
      </PictureContainer>
    </SelectFrame>
  );
}

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
  height: 100%;

  border-radius: 10px;
  text-align: center;
  background-color: #d9d9d9;

  box-shadow: 2px 2px 5px 1px rgba(62, 78, 82, 0.4);
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;

  border-radius: 10px;

  box-shadow: 2px 2px 5px 1px rgba(62, 78, 82, 0.4);
`;
