import axios, { AxiosHeaders } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import ArrowBackIcon from '../components/common/icons/ArrowBackIcon';
import { LeftButton, WhiteLeftButton } from '../styles/components/Button';
import { FormTitle, Input, InputContainer } from '../styles/components/Form';
import { Frame } from '../styles/components/Frame';
import { Title } from '../styles/components/Title';
axios.defaults.withCredentials = true;
const JWT_EXPIRE_TIME = 24 * 3600 * 1000;

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

  const signIn = async (data: SignInForm) => {
    await axios
      .post('/login', data)
      .then(res => {
        const { accessToken } = res.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        // setTimeout(onSlientRefresh, JWT_EXPIRE_TIME - 60000);
        router.push('/signin');
      })
      .catch(() => {
        alert('에러가 발생했습니다.');
      });
  };

  return (
    <Frame>
      <Row>
        <WhiteLeftButton>
          <Link href="/">
            <ArrowBackIcon />
          </Link>
        </WhiteLeftButton>
        <Title>Text me!</Title>
        <LayoutSpan aria-hidden />
      </Row>
      <Form onSubmit={handleSubmit(signIn)}>
        <FormTitle>로그인</FormTitle>
        <InputContainer>
          <Input
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: '올바른 이메일 형식이 아닙니다.',
              },
            })}
            placeholder="이메일을 입력해주세요."
          />
          {errors.email && <em>{errors.email.message}</em>}
        </InputContainer>
        <InputContainer>
          <Input
            type="password"
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 10,
                message: '최소 10자 이상의 비밀번호를 입력해주세요.',
              },
              maxLength: {
                value: 20,
                message: '비밀번호는 20자를 초과하면 안됩니다.',
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[A-Za-z])[\40-\176]{10,220}$/,
                message: '영문, 숫자를 혼용하여 입력해주세요.',
              },
            })}
            placeholder="비밀번호를 입력해주세요."
          />
          {errors.password && <em>{errors.password.message}</em>}
        </InputContainer>
        <LeftButton type="submit">확인</LeftButton>
      </Form>
    </Frame>
  );
}

export default SignIn;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LayoutSpan = styled.span`
  width: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  ${LeftButton} {
    margin-top: 55px;
  }
`;
