import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
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
import { Kakao } from "../common/button/ButtonStyle";
import Button from "../common/button/Button";
import { Icon } from "@iconify/react";

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
      <Button Style={Kakao}>
        <Icon icon="bxs:message-rounded" color="black" />
        <span>카카오 로그인</span>
        <span aria-hidden></span>
      </Button>
    </Frame>
  );
}

export default SignIn;
