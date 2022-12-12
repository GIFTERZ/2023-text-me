import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRoomEnter } from "../../stores/useRoomEnter";
import { LeftButton } from "../../styles/components/Button";
import {
  Input,
  InputContainer,
  FormTitle,
  Description,
} from "../../styles/components/Form";

type EmailForm = {
  email: string;
};
function RoomEnterForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EmailForm>();

  const { isLoading, enter } = useRoomEnter();
  const pushRoom = (id: number) => {
    router.push(`/${id}`);
  };

  const validateForm = async (data: EmailForm) => {
    enter(data.email, pushRoom);
  };

  return (
    <Form onSubmit={handleSubmit(validateForm)}>
      <div>
        <FormTitle>이메일로 다른 사람 방 입장하기</FormTitle>
        <Description>
          Text me! 는 연말에 서로 마음을 나눌 수 있는 편지쓰기 사이트에요.
          이메일을 입력해서 다른사람의 방에 입장해보세요. 💌
        </Description>
      </div>
      <InputContainer>
        <Input
          {...register("email", {
            required: "값을 입력해주세요.",
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
          type="text"
          placeholder="이메일을 입력해주세요."
        />
        {errors?.email && <em>{errors.email.message}</em>}
      </InputContainer>
      <LeftButton disabled={isLoading} type="submit">
        확인하고 편지 쓰러가기
      </LeftButton>
    </Form>
  );
}

export default RoomEnterForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${FormTitle} {
    margin-bottom: 8px;
  }
`;
