import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SelectCard from "../../components/write/SelectCard";
import WriteLetter from "../../components/write/WriteLetter";
import { useCardPicture } from "../../stores/useCardPicture";
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
  const { setPictureUrl } = useCardPicture();

  const { sendLetter } = useSendLetter();

  useEffect(() => {
    if (searchParams.get("type") == "post") {
      setProcess(PROCESS.WRITE);
      setPictureUrl("/static/images/room-background.png");
    }
  }, []);

  switch (process) {
    case PROCESS.SELECT:
      return (
        <SelectCard type={"SELECT"} next={() => setProcess(PROCESS.WRITE)} />
      );
    case PROCESS.WRITE:
      return (
        <WriteLetter
          prev={() => router.push("/slow-letter/get-info")}
          next={() => setProcess(PROCESS.COMPLETE)}
          sendLetter={sendLetter}
          to={"12월 31일의 나"}
        />
      );
    case PROCESS.COMPLETE:
      return <></>;
  }
}

export default Write;
