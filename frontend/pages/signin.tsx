import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import styled from "styled-components";
import ArrowBackIcon from "../components/common/icons/ArrowBackIcon";
import { WhiteLeftButton } from "../styles/components/Button";
import { Frame } from "../styles/components/Frame";
import visitorApi from "../auth/visitorApi";
import { setCookie } from "../auth/Cookie";
import { HeaderLayout, LayoutSpan } from "../styles/components/Layout";
import Logo from "../components/common/Logo";
import { useMembers } from "../stores/useMembers";
import Head from "next/head";
import { useKakaoLogin } from "../stores/useKakaoLogin";
import Form from "../common/form/Form";
import SignInFormContext from "../components/signin/SigninFormContext";

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

  const signIn = async (data: FieldValues) => {
    await visitorApi
      .post("/users/login", data)
      .then((res) => {
        let createdTime = new Date().getTime();
        const {
          data: { token },
        } = res;
        setCookie("textMeAccessToken", token);
        localStorage.setItem(
          "textMeAccessExpiryTime",
          (createdTime + ACCESS_EXPIRY_TIME).toString()
        );
      })
      .catch((error) => {
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
      <Form
        onSubmit={signIn}
        inputs={SignInFormContext.getContext()}
        buttonText={"로그인"}
      >
        <h2>로그인</h2>
      </Form>
      <KakaoLoginButton href={KAKAO_AUTH_URL} role="button">
        <img src="static/images/kakao_login_medium_wide.png" />
      </KakaoLoginButton>
    </Frame>
  );
}

export default SignIn;

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
