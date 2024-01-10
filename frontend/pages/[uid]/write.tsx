import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SelectCard from "../../components/write/SelectCard";
import WriteLetter from "../../components/write/WriteLetter";
import { useRoomInfo } from "../../stores/useRoomInfo";
import { useSendLetter } from "../../stores/useSendLetter";

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

  useEffect(() => {
    getRoomInfo(searchParams.get("uid"));
  }, []);

  switch (process) {
    case PROCESS.SELECT:
      return (
        <SelectCard type={"SELECT"} next={() => setProcess(PROCESS.WRITE)} />
      );
    case PROCESS.WRITE:
      return (
        <>
          {roomInfo.id && (
            <WriteLetter
              prev={() => router.push("/slow-letter/get-info")}
              next={() => setProcess(PROCESS.COMPLETE)}
              sendLetter={sendLetter}
              letterData={{ receiverId: roomInfo.id }}
              to={roomInfo.userName}
            />
          )}
        </>
      );
    case PROCESS.COMPLETE:
      return <></>;
  }
}

export default Write;
