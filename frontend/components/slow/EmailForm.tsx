import React from "react";
import { FieldValues } from "react-hook-form";
import Form from "../../common/form/Form";
import { BackgroundImage } from "../../pages/slow-letter";
import { SelectContainer } from "../../pages/slow-letter/get-info";
import { useSlowLetterInfo } from "../../stores/useSlowLetterInfo";
import EmailFormContext from "./EmailFormContext";

interface Props {
  complete: Function;
}

function EmailForm({ complete }: Props) {
  const { setEmail } = useSlowLetterInfo();
  const handleEmailSubmit = (data: FieldValues) => {
    console.log(data.email);
    setEmail(data.email);
    complete();
  };

  return (
    <SelectContainer>
      <Form
        onSubmit={handleEmailSubmit}
        inputs={EmailFormContext.getContext()}
        buttonText={"확인"}
      >
        <h2>편지를 받을 이메일을 입력해주세요.</h2>
      </Form>
      <BackgroundImage src="/static/images/room-background.png" />
    </SelectContainer>
  );
}

export default EmailForm;
