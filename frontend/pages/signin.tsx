import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { Frame } from "../styles/components/Frame";
import { useMembers } from "../stores/useMembers";
import Head from "next/head";
import Form from "../common/form/Form";
import SignInFormContext from "../components/signin/SigninFormContext";
import KakaoLoginButton from "../components/signin/KakaoLoginButton";
import { useLogin } from "../stores/useLogin";
import Link from "next/link";
import styled from "styled-components";
import BackHeader from "../components/common/BackHeader";
import Logo from "../components/common/Logo";

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
      <BackHeader onBackClick={() => router.push("/")}>
        <Logo />
      </BackHeader>
      <Form
        onSubmit={signIn}
        inputs={SignInFormContext.getContext()}
        buttonText={"로그인"}
      >
        <h2>로그인</h2>
      </Form>
      <KakaoLoginButton />
      <LinkContainer>
        <Link href="/signup">이메일로 회원가입</Link>
      </LinkContainer>
    </Frame>
  );
}

export default SignIn;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  color: gray;
  text-decoration: underline;
  margin: 20px;
  &:hover {
    cursor: pointer;
  }
`;
