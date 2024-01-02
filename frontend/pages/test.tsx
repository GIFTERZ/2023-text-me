import { useState } from "react";
import PreviewCard from "../components/write/PreviewCard";
import SelectCard from "../components/write/SelectCard";
import WriteLetter from "../components/write/WriteLetter";

interface Props {
  to: string;
}

const PROCESS = {
  SELECT: "SELECT",
  PREVIEW: "PREVIEW",
  WRITE: "WRITE",
  COMPLETE: "COMPLETE",
};

export default function index({ to }: Props) {
  const [process, setProcess] = useState(PROCESS.SELECT);

  switch (process) {
    case PROCESS.SELECT:
      return <SelectCard next={() => setProcess(PROCESS.PREVIEW)} />;
    case PROCESS.PREVIEW:
      return (
        <PreviewCard
          prev={() => setProcess(PROCESS.SELECT)}
          next={() => setProcess(PROCESS.WRITE)}
        />
      );
    case PROCESS.WRITE:
      return (
        <WriteLetter
          prev={() => setProcess(PROCESS.PREVIEW)}
          next={() => setProcess(PROCESS.COMPLETE)}
          to={to}
        />
      );
    case PROCESS.COMPLETE:
      return <></>;
  }
}
