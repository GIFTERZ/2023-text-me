import React from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { BackgroundImage } from "../../pages/slow-letter";
import { SelectContainer } from "../../pages/slow-letter/get-info";
import { useSlowLetterInfo } from "../../stores/useSlowLetterInfo";

interface Props {
  complete: Function;
}

function PostCodeForm({ complete }: Props) {
  const { setAddress } = useSlowLetterInfo();

  const completeAddress = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress({ zonecode: data.zonecode, defaultAddress: fullAddress });
    complete();
  };

  return (
    <SelectContainer>
      <h3>편지를 받을 주소 정보를 입력해주세요.</h3>
      <DaumPostcodeEmbed
        autoClose
        onComplete={completeAddress}
        className="postcode-input"
      />
      <BackgroundImage src="/static/images/room-background.png" />
    </SelectContainer>
  );
}

export default PostCodeForm;
