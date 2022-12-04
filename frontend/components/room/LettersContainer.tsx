import React, { useEffect } from "react";
import { useLetters } from "../../stores/useLetters";
import { useLetterView } from "../../stores/useLetterView";

interface Props {
  userId: number;
}

function LettersContainer({ userId }: Props) {
  const { isLoading, error, letters, getLetters } = useLetters();
  const { open } = useLetterView();

  useEffect(() => {
    getLetters(userId);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div id="letters">
      {letters.map((letter) => (
        <div key={letter.id} onClick={() => open(letter.id)}>
          <img src={letter.cardImg} style={{ width: "100px" }} />
        </div>
      ))}
    </div>
  );
}

export default LettersContainer;
