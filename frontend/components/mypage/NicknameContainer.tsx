import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMembers } from "../../stores/useMembers";

type MemberForm = {
  nickname: string;
};

function NicknameContainer() {
  const [editing, setEditing] = useState(false);

  const {
    isGetLoading,
    getError,
    isPatchLoading,
    patchError,
    member,
    getMember,
    patchNickname,
  } = useMembers();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberForm>();

  useEffect(() => {
    getMember();
  }, []);

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const validateForm = (data: MemberForm) => {
    patchNickname({ ...data, ...member });

    if (patchError) {
      alert("에러가 발생했습니다.");
      return;
    }

    toggleEditing();
  };

  if (isGetLoading) {
    return <div>Loading...</div>;
  }

  if (getError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(validateForm)}>
        <label>닉네임</label>
        <input
          {...register("nickname", {
            required: "닉네임을 입력해주세요.",
          })}
          defaultValue={member?.nickname}
          disabled={!editing}
        />
        {errors && <em>{errors.nickname?.message}</em>}
        {editing ? (
          <button type="submit" disabled={isPatchLoading}>
            등록
          </button>
        ) : (
          <button onClick={toggleEditing} type="button">
            수정
          </button>
        )}
      </form>
    </div>
  );
}

export default NicknameContainer;
