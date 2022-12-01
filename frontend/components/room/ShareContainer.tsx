import React, { useState } from "react";
import ShareModal from "./ShareModal";

function ShareContainer() {
  const [shareModal, setShareModal] = useState(false);

  const openNativeShareDialog = () => {
    navigator.share({
      title: "공유하기",
      url: location.href,
    });
  };

  const onShareClick = () => {
    if (!navigator.share) {
      setShareModal(true);
      return;
    }

    openNativeShareDialog();
  };

  return (
    <>
      {shareModal && <ShareModal close={() => setShareModal(false)} />}
      <button onClick={onShareClick} type="button">
        공유
      </button>
    </>
  );
}

export default ShareContainer;
