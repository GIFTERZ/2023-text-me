import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import LettersContainer from "../components/room/LettersContainer";
import ShareContainer from "../components/room/ShareContainer";
import SaveContainer from "../components/room/SaveContainer";

function Room() {
  const { get } = useSearchParams();
  const pathname = usePathname();
  const userId = Number(get("uid"));

  return (
    <div>
      <div>
        <ShareContainer />
        <SaveContainer />
        {/* To do: 비로그인 구분 */}
        <Link href="/">메인</Link>
      </div>
      <LettersContainer userId={userId} />
      <Link href={`${pathname}/write`}>Text Username</Link>
    </div>
  );
}

export default Room;
