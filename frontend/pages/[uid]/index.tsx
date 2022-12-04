import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import LettersContainer from "../../components/room/LettersContainer";
import ShareContainer from "../../components/room/ShareContainer";
import SaveContainer from "../../components/room/SaveContainer";
import LetterViewContainer from "../../components/room/LetterViewContainer";
import { useRoomInfo } from "../../stores/useRoomInfo";
import Background from "../../components/room/Background";

function Room() {
  const { get } = useSearchParams();
  const pathname = usePathname();
  const userId = Number(get("uid"));

  const { getRoomInfo } = useRoomInfo();

  useEffect(() => {
    getRoomInfo(userId);
  }, []);

  return (
    <Background>
      <div>
        <ShareContainer />
        <SaveContainer />
        {/* To do: 비로그인 구분 */}
        <Link href="/">메인</Link>
      </div>
      <LettersContainer userId={userId} />
      <Link href={`${pathname}/write`}>Text Username</Link>
      <LetterViewContainer />
    </Background>
  );
}

export default Room;
