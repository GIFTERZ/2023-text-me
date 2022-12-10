import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { setCookie } from "../components/common/Cookie";
import ArrowBackIcon from "../components/common/icons/ArrowBackIcon";
import { LeftButton, WhiteLeftButton } from "../styles/components/Button";
import { FormTitle, Input, InputContainer } from "../styles/components/Form";
import { Frame } from "../styles/components/Frame";
import visitorApi from "../auth/visitorApi";
import {
  FormLayout,
  HeaderLayout,
  LayoutSpan,
} from "../styles/components/Layout";
import Logo from "../components/common/Logo";
import { useMembers } from "../stores/useMembers";

type SignInForm = {
  email: string;
  password: string;
};

function SignIn() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

  const { member, getMember } = useMembers();

  useEffect(() => {
    if (member) {
      router.push(`/${member.id}`);
    }
  }, [member]);

  const signIn = async (data: SignInForm) => {
    await visitorApi
      .post("/users/login", data)
      .then((res) => {
        const {
          data: { token, refreshTokenId, id },
        } = res;
        setCookie("textMeAccessToken", token);
        localStorage.setItem("textMeRefreshTokenId", refreshTokenId);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("이메일 또는 비밀번호를 다시 확인해주세요.");
        } else {
          alert("에러가 발생했습니다.");
        }
      })
      .finally(() => {
        getMember();
      });
  };

  return (
    <Frame>
      <HeaderLayout>
        <WhiteLeftButton onClick={() => router.back()}>
          <ArrowBackIcon />
        </WhiteLeftButton>
        <Logo />
        <LayoutSpan aria-hidden />
      </HeaderLayout>
      <Form onSubmit={handleSubmit(signIn)}>
        <FormLayout>
          <FormTitle>로그인</FormTitle>
          <InputContainer>
            <Input
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "올바른 이메일 형식이 아닙니다.",
                },
              })}
              placeholder="이메일을 입력해주세요."
            />
            {errors.email && <em>{errors.email.message}</em>}
          </InputContainer>
          <InputContainer>
            <Input
              type="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 10,
                  message: "최소 10자 이상의 비밀번호를 입력해주세요.",
                },
                maxLength: {
                  value: 20,
                  message: "비밀번호는 20자를 초과하면 안됩니다.",
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[A-Za-z])[\40-\176]{10,220}$/,
                  message: "영문, 숫자를 혼용하여 입력해주세요.",
                },
              })}
              placeholder="비밀번호를 입력해주세요."
            />
            {errors.password && <em>{errors.password.message}</em>}
          </InputContainer>
        </FormLayout>
        <LeftButton type="submit">확인</LeftButton>
      </Form>
    </Frame>
  );
}

export default SignIn;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 85%;

  ${LeftButton} {
  }
`;
