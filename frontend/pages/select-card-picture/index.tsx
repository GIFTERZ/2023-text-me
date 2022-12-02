import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Router from 'next/router';
import { useCardPicture } from '../../stores/useCardPicture';

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
    router.push('/preview-card-picture');
  };

  return (
    <>
      <h1>편지에 쓸 사진을 골라주세요</h1>
      <div>
        <form>
          <label htmlFor="file">갤러리에서 선택하기</label>
          <div onClick={handleClick} style={{ width: 100, height: 100, backgroundColor: 'blue' }}>
            +
          </div>
          <input style={{ display: 'none' }} ref={fileRef} name="file" type="file" accept="image/*" onChange={e => fileUploadHandler(e)} />
          {pictureUrl && <img src={pictureUrl} style={{ width: 100, height: 100 }}></img>}
          <div onClick={sendFile}>버튼으로 전송하기</div>
        </form>
      </div>
    </>
  );
}
