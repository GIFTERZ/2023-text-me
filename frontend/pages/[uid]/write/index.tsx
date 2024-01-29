import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SelectCard from "../../../components/write/SelectCard";
import WriteLetter from "../../../components/write/WriteLetter";
import { useCardPicture } from "../../../stores/useCardPicture";
import { useRoomInfo } from "../../../stores/useRoomInfo";
import { useSendLetter } from "../../../stores/useSendLetter";

const PROCESS = {
  SELECT: "SELECT",
  PREVIEW: "PREVIEW",
  WRITE: "WRITE",
  COMPLETE: "COMPLETE",
};

function Write() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [process, setProcess] = useState(PROCESS.SELECT);

  const { sendLetter } = useSendLetter();
  const { roomInfo, getRoomInfo } = useRoomInfo();
  const { pictureUrl } = useCardPicture();

  useEffect(() => {
    const userId = searchParams.get("uid");
    if (userId) {
      getRoomInfo(userId);
    }
  }, [searchParams]);

  switch (process) {
    case PROCESS.SELECT:
      return (
        <SelectCard type={"SELECT"} next={() => setProcess(PROCESS.WRITE)} />
      );
    case PROCESS.WRITE:
      return (
        <>
          {roomInfo?.id && (
            <WriteLetter
              prev={() => setProcess(PROCESS.SELECT)}
              next={() => router.push(`/${roomInfo.id}/write/send-complete`)}
              sendLetter={sendLetter}
              letterData={{ receiverId: roomInfo.id, imageUrl: pictureUrl }}
              to={roomInfo.userName}
            />
          )}
        </>
      );
  }
}

export default Write;
