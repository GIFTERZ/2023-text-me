import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRoomEnter } from "../../stores/useRoomEnter";
import { LeftButton } from "../../styles/components/Button";
import { Input, InputContainer, Label } from "../../styles/components/Form";

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

  const { isLoading, enter, error } = useRoomEnter();
  const pushRoom = (id: number) => {
    router.push(`/${id}`);
  };

  const validateForm = async (data: EmailForm) => {
    enter(data, pushRoom);

    if (error) {
      // API 명세 후 핸들링 코드 추가
      alert("에러가 발생했습니다.");
    }
  };

  return (
    <Form onSubmit={handleSubmit(validateForm)}>
      <Label>이메일로 다른 사람 방 입장하기</Label>
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
        확인
      </LeftButton>
    </Form>
  );
}

export default RoomEnterForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${Label} {
    margin-bottom: 5px;
  }
`;
