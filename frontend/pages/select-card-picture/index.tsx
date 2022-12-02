import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Router from 'next/router';
import Link from 'next/link';

const colors = ['red', 'orange', 'white', 'gray'];

export default function index() {
  const router = useRouter();
  const [selectedPicture, setSelectedPicture] = useState<File | null>();
  const [previewImage, setPreviewImage] = useState<string>('');
  const fileRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileRef?.current?.click();
  };

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    setSelectedPicture(target.files[0]);
    setPreviewImage(URL.createObjectURL(target.files[0]));
    console.log('URL:' + URL.createObjectURL(target.files[0]));
    console.log(selectedPicture);
    console.log(target.files[0]);

    console.log(fileRef);

    // if (files === undefined) {
    //   return;
    // }

    // setSelectedPicture(files);
  };

  const sendFile = () => {
    router.push(`/preview-card-picture?file=${previewImage}`);
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
          {colors.map(color => (
            <div key={color} style={{ width: 100, height: 100, backgroundColor: `${color}` }}></div>
          ))}
          {previewImage && <img src={previewImage} style={{ width: 100, height: 100 }}></img>}
          <div onClick={sendFile}>버튼으로 전송하기</div>
          <Link href={`/preview-card-picture?file=${previewImage}`}>전송하기</Link>
        </form>
      </div>
    </>
  );
}
