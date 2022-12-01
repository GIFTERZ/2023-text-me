import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import LettersContainer from "../components/room/LettersContainer";

function Room() {
  const { get } = useSearchParams();
  const userId = Number(get("uid"));

  return (
    <div>
      <div>
        <button type="button">공유</button>
        <button type="button">저장</button>
        {/* To do: 비로그인 구분 */}
        <Link href="/">메인</Link>
      </div>
      <LettersContainer userId={userId} />
    </div>
  );
}

export default Room;
