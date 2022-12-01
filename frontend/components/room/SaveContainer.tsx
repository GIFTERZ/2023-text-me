import React from "react";
import { toJpeg } from "html-to-image";

function SaveContainer() {
  const save = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  const captureLetters = () => {
    const letters = document.getElementById("letters") as HTMLElement;
    toJpeg(letters)
      .then((url) => {
        save(url, "letters.jpeg");
        alert("저장되었습니다.");
      })
      .catch(() => {
        alert("저장에 실패했습니다.");
      });
  };

  return (
    <div>
      <button onClick={captureLetters} type="button">
        저장
      </button>
    </div>
  );
}

export default SaveContainer;
