import React, { useState } from 'react';
import Router from 'next/router';
import { useCardPicture } from '../../stores/useCardPicture';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function index() {
  const [date, setDate] = useState<Date>(new Date());
  const router = useRouter();
  const { pictureUrl, pictureDate, setPictureDate, pictureComment, setPictureComment } = useCardPicture();
  return (
    <>
      <h1>사진 확인하기</h1>
      <button onClick={() => router.back()}>뒤로가기</button>
      {pictureUrl && <img src={pictureUrl} style={{ width: 100, height: 100 }} />}
      <DatePicker fixedHeight selected={date} onChange={(date: Date) => setDate(date)} />
      <input type="text" placeholder="사진에 대한 한마디" value={pictureComment} onChange={e => setPictureComment(e.target.value)} />
      <button
        onClick={() => {
          setPictureDate(date);
          console.log(pictureDate);
          console.log(pictureComment);
        }}
      >
        편지쓰기
      </button>
    </>
  );
}
