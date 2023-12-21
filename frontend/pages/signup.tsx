import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import styled from "styled-components";
import { FormTitle, Description } from "../styles/components/Form";
import { Frame } from "../styles/components/Frame";

import Logo from "../components/common/Logo";
import Head from "next/head";
import BackHeader from "../components/common/BackHeader";
import SignupFormContext from "../components/signup/SignupFormContext";
import Form from "../common/form/Form";
import { useSignup } from "../stores/useSignup";

function SignUp() {
  const router = useRouter();
  const { trySignup } = useSignup();

  const signUp = (data: FieldValues) => {
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    trySignup(body, () => router.push("/signin"));
  };

  return (
    <Frame>
      <Head>
        <title>회원가입 - Text me!</title>
      </Head>
      <BackHeader>
        <Logo />
      </BackHeader>
      <Form
        onSubmit={signUp}
        inputs={SignupFormContext.getContext()}
        buttonText={"확인"}
      >
        <div>
          <h2>회원가입하고 내 방 만들기</h2>
          <p>이메일과 비밀번호는 잊어버리면 찾을 수 없으므로 유의해주세요.</p>
        </div>
      </Form>
    </Frame>
  );
}

export default SignUp;
