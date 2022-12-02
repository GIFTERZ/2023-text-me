import React from 'react';
import Router from 'next/router';
import { useCardPicture } from '../../stores/useCardPicture';
import { useRouter } from 'next/navigation';

export default function index() {
  const router = useRouter();
  const { pictureUrl } = useCardPicture();
  return (
    <>
      <h1>사진 확인하기</h1>
      <button onClick={() => router.back()}>뒤로가기</button>
      {pictureUrl && <img src={pictureUrl} style={{ width: 100, height: 100 }} />}
      <button>편지쓰기</button>
    </>
  );
}
