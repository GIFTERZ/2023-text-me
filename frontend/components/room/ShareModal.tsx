import React, { useRef } from "react";

interface Props {
  close: () => void;
}

function ShareModal({ close }: Props) {
  const onCopyClick = () => {
    const url = location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("링크를 복사했습니다.");
    });
  };

  return (
    <div>
      <button onClick={close} type="button">
        닫기
      </button>
      <h2>공유하기</h2>
      <button onClick={onCopyClick} type="button">
        복사
      </button>
    </div>
  );
}

export default ShareModal;
