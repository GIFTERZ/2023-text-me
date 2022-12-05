import React from 'react';
import { useCardPicture } from '../../stores/useCardPicture';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { Input } from '../../styles/components/Form';
import styled from 'styled-components';

export default function PictureDatePicker() {
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
  const { pictureDate, setPictureDate } = useCardPicture();

  return (
    <DatePicker
      locale={ko}
      dateFormat="yyyy년 MM월 dd일"
      fixedHeight
      selected={pictureDate}
      onChange={(date: Date) => setPictureDate(date)}
      customInput={<CustomInput />}
      placeholderText="날짜 선택"
    />
  );
}

const CustomInput = styled(Input)`
  color: black;
  font-family: 'Cafe24Ssurround';
  margin-top: 20px;
  display: inline-block;
  left: 0 !important;
`;
