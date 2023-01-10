import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ArrowBackIcon from "../components/common/icons/ArrowBackIcon";
import { LeftButton, WhiteLeftButton } from "../styles/components/Button";
import { FormTitle, Input, InputContainer } from "../styles/components/Form";
import { Frame } from "../styles/components/Frame";
import visitorApi from "../auth/visitorApi";
import { setCookie } from "../auth/Cookie";
import { FormLayout, HeaderLayout, LayoutSpan } from "../styles/components/Layout";
import Logo from "../components/common/Logo";
import { useMembers } from "../stores/useMembers";
import Head from "next/head";
import { useKakaoLogin } from "../stores/useKakaoLogin";

type SignInForm = {
  email: string;
  password: string;
};

function SignIn() {
  const ACCESS_EXPIRY_TIME = 36000000;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

  const { member, getMember } = useMembers();
  const { getKakaoToken } = useKakaoLogin();

  useEffect(() => {
    if (member) {
      router.push(`/${member.id}`);
    }
  }, [member]);

  const signIn = async (data: SignInForm) => {
    await visitorApi
      .post("/users/login", data)
      .then(res => {
        let createdTime = new Date().getTime();
        const {
          data: { token },
        } = res;
        setCookie("textMeAccessToken", token);
        localStorage.setItem("textMeAccessExpiryTime", (createdTime + ACCESS_EXPIRY_TIME).toString());
      })
      .catch(error => {
        if (error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("에러가 발생했습니다.");
        }
      })
      .finally(() => {
        getMember();
      });
  };

  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY;
  const KAKAO_REDIRECT_URI = `${process.env.NEXT_PUBLIC_SERVICE_URL}/signin`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      getKakaoToken({ code });
    }
  }, []);

  return (
    <Frame>
      <Head>
        <title>로그인 - Text me!</title>
      </Head>
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
                  value: 8,
                  message: "최소 8자 이상의 비밀번호를 입력해주세요.",
                },
                maxLength: {
                  value: 64,
                  message: "비밀번호는 64자를 초과하면 안됩니다.",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,64}$/,
                  message: "영소문자, 숫자가 포함된 8자 이상의 비밀번호를 입력해주세요",
                },
              })}
              placeholder="비밀번호를 입력해주세요."
            />
            {errors.password && <em>{errors.password.message}</em>}
          </InputContainer>
          <LeftButton type="submit">로그인</LeftButton>
          <KakaoLoginButton href={KAKAO_AUTH_URL} role="button">
            <img src="static/images/kakao_login_medium_wide.png" />
          </KakaoLoginButton>
        </FormLayout>
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
`;

const KakaoLoginButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;

  font-weight: 700;
  font-size: 17px;
  line-height: 17px;

  color: #000000 85%;

  background: #fee500;
  border: none;

  box-shadow: 2px 2px 5px 1px rgba(62, 78, 82, 0.4),
    inset -2px -2px 3px rgba(106, 106, 106, 0.25),
    inset 2px 2px 3px rgba(255, 255, 255, 0.5);

  cursor: pointer;

  &:focus {
    outline: none;
    background: #fee500;
    color: #fee500;
  }
  border-radius: 10px 10px 10px 10px;
`;
