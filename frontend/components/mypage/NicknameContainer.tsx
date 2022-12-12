import React, { MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useMembers } from "../../stores/useMembers";
import styled from "styled-components";
import { WhiteButton } from "../../styles/components/Button";

type MemberForm = {
  userName: string;
};

function NicknameContainer() {
  const [editing, setEditing] = useState(false);

  const {
    isLoading,
    error,
    isPatchLoading,
    patchError,
    member,
    patchNickname,
  } = useMembers();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberForm>();

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const validateForm = (data: MemberForm) => {
    patchNickname(data.userName);

    if (patchError) {
      alert("에러가 발생했습니다.");
      return;
    }

    toggleEditing();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <Container>
      <RowLayout>
        <Form onSubmit={handleSubmit(validateForm)}>
          <Input
            {...register("userName", {
              required: "닉네임을 입력해주세요.",
            })}
            defaultValue={member?.userName}
            disabled={!editing}
            placeholder="닉네임을 입력해주세요."
          />
          {editing && (
            <WhiteButton type="submit" disabled={isPatchLoading}>
              등록
            </WhiteButton>
          )}
        </Form>
        {!editing && (
          <WhiteButton type="button" onClick={toggleEditing}>
            수정
          </WhiteButton>
        )}
      </RowLayout>
      {errors && <em>{errors.userName?.message}</em>}
    </Container>
  );
}

export default NicknameContainer;

const Container = styled.div`
  margin-bottom: 20px;
  width: 100%;

  ${WhiteButton} {
    padding: 5px;
    height: fit-content;
    color: #0eca92;
  }
`;

const RowLayout = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const Input = styled.input`
  padding: 0px 5px;

  margin-bottom: 5px;
  width: 100%;

  background: none;
  border: none;
  border-bottom: ${(p) => (p.disabled ? "none" : "solid 1px black")};

  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  color: #000000;

  &::placeholder {
    color: gray;
  }

  &:focus {
    outline: none;
  }
`;
