import React, { useState } from 'react';
import Router from 'next/router';
import { useCardPicture } from '../../stores/useCardPicture';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

export default function index() {
  const [date, setDate] = useState<Date>(new Date());
  const router = useRouter();
  const { pictureUrl, pictureDate, setPictureDate, pictureComment, setPictureComment } = useCardPicture();
  const dateToString = (date: Date) => {
    return (
      date.getFullYear() +
      '년 ' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '월 ' +
      date.getDate().toString().padStart(2, '0') +
      '일'
    );
  };
  return (
    <>
      <h1>사진 확인하기</h1>
      <button onClick={() => router.back()}>뒤로가기</button>
      {pictureUrl && <img src={pictureUrl} style={{ width: 100, height: 100 }} />}
      <DatePicker
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        fixedHeight
        selected={pictureDate}
        onChange={(date: Date) => setPictureDate(date)}
      />
      <input type="text" placeholder="사진에 대한 한마디" value={pictureComment} onChange={e => setPictureComment(e.target.value)} />
      <button
        onClick={() => {
          // 편지 작성 화면 이동
        }}
      >
        편지쓰기
      </button>
    </>
  );
}
