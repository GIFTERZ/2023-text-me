import React from "react";
import Button from "../../common/button/Button";
import { GreenRightCorner } from "../../common/button/ButtonStyle";
import { BackgroundImage } from "../../pages/slow-letter";
import { SelectContainer } from "../../pages/slow-letter/get-info";

interface Props {
  selectMail: Function;
  selectPost: Function;
}

function SelectMethod({ selectMail, selectPost }: Props) {
  return (
    <SelectContainer>
      <h3>편지 수령 방식을 선택해주세요.</h3>
      <div>
        <Button
          Style={GreenRightCorner}
          props={{
            onClick: () => selectMail(),
          }}
        >
          메일로 받을게요.
        </Button>
        <Button
          Style={GreenRightCorner}
          props={{
            onClick: () => selectPost(),
          }}
        >
          우편으로 받을게요.
        </Button>
      </div>
    </SelectContainer>
  );
}

export default SelectMethod;
