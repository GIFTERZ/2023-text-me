import React from "react";
import { useLetterView } from "../../stores/useLetterView";

function LetterView() {
  const { letter, isLoading, error } = useLetterView();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>편지 불러오기에 실패했습니다.</div>;
  }

  return <div>{letter?.id}</div>;
}

export default LetterView;
