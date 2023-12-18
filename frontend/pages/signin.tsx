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
import Form from "../common/form/Form";
import SignInFormContext from "../components/signin/SigninFormContext";
import KakaoLoginButton from "../components/signin/KakaoLoginButton";
import { useLogin } from "../stores/useLogin";

function SignIn() {
  const router = useRouter();

  const { member, getMember } = useMembers();
  const { getToken } = useLogin();

  useEffect(() => {
    if (member) {
      router.push(`/${member.id}`);
    }
  }, [member]);

  const signIn = (data: FieldValues) => {
    getToken(data, getMember);
  };

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
      <KakaoLoginButton />
    </Frame>
  );
}

export default SignIn;
