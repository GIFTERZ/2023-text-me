import React, { useRef, useState } from 'react';
import Router from 'next/router';
import { useCardPicture } from '../../stores/useCardPicture';

export default function index() {
  const { pictureURL } = useCardPicture();
  return (
    <>
      <h1>사진 확인하기</h1>
      <img src={pictureURL.toString()} style={{ width: 100, height: 100 }} />
    </>
  );
}
