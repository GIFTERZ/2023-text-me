import React, { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import Form from "../../common/form/Form";
import { BackgroundImage } from "../../pages/slow-letter";
import { Back, SelectContainer } from "../../pages/slow-letter/get-info";
import { useMembers } from "../../stores/useMembers";
import { useSlowLetterInfo } from "../../stores/useSlowLetterInfo";
import EmailFormContext from "./EmailFormContext";
import Logo from "../common/Logo";

interface Props {
  complete: Function;
}

function EmailForm({ complete }: Props) {
  const { setEmail } = useSlowLetterInfo();
  const { member, getMember } = useMembers();
  const handleEmailSubmit = (data: FieldValues) => {
    setEmail(data.email);
    complete();
  };

  useEffect(() => {
    getMember();
  }, []);

  const RenderForm = ({ email }: { email: string }) => {
    return (
      <Form onSubmit={handleEmailSubmit} inputs={EmailFormContext.getContext()} buttonText={"확인"} defaultValues={{ email }}>
        <h2>편지를 받을 이메일을 입력해주세요.</h2>
      </Form>
    );
  };

  return (
    <div>
      <Back>
        <Logo />
      </Back>
      <SelectContainer>
        <RenderForm email={member ? member.email : ""} />
        <BackgroundImage src="/static/images/room-background.png" />
      </SelectContainer>
    </div>
  );
}

export default EmailForm;
