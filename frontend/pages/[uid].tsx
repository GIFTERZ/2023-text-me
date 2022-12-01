import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useLetters } from "../stores/useLetters";

function Room() {
  const { get } = useSearchParams();
  const userId = Number(get("uid"));
  const { isLoading, error, letters, getLetters } = useLetters();

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
    <div>
      {letters.map((letter) => (
        <div key={letter.id}>
          <img src={letter.cardImg} style={{ width: "100px" }} />
        </div>
      ))}
    </div>
  );
}

export default Room;
