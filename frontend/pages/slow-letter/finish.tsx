import React from "react";
import CardRotator from "../../components/slow/CardRotator";
import { BackgroundImage } from ".";
import WriteFinishBox from "../../components/slow/WriteFinishBox";

function finish() {
  return (
    <div>
      <BackgroundImage src="/static/images/room-background.png" />
      <CardRotator />
      <WriteFinishBox />
    </div>
  );
}

export default finish;
