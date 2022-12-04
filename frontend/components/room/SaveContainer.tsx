import React, { useState } from "react";
import { toJpeg } from "html-to-image";
import { WhiteButton } from "../../styles/components/Button";
import SaveIcon from "./icons/SaveIcon";
import SaveModal from "./SaveModal";

function SaveContainer() {
  const LOADING_TEXT = "저장 중입니다.";
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState(LOADING_TEXT);

  const save = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  const captureLetters = () => {
    setLoading(true);

    const letters = document.getElementById("letters") as HTMLElement;
    const filter = (node: HTMLElement) => {
      const exclusionClasses = ["dont-save"];
      return !exclusionClasses.some((classname) =>
        node.classList?.contains(classname)
      );
    };

    toJpeg(letters, { filter })
      .then((url) => {
        save(url, "letters.jpeg");
        alert("저장되었습니다.");
      })
      .catch(() => {
        alert("저장에 실패했습니다.");
      })
      .finally(() => {
        setLoading(false);
        setStatusText(LOADING_TEXT);
      });
  };

  return (
    <WhiteButton onClick={captureLetters} type="button">
      {loading && <SaveModal text={statusText} />}
      <SaveIcon />
    </WhiteButton>
  );
}

export default SaveContainer;
