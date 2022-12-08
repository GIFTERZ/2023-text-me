import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { LeftButton } from '../styles/components/Button';
import { Input, FormTitle, Description, InputContainer } from '../styles/components/Form';
import { Frame } from '../styles/components/Frame';
import { Title } from '../styles/components/Title';
import visitor_api from '../auth/visitor_api';

type SignUpForm = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>();

  const passwordField = watch('password');

  const signUp = async (data: SignUpForm) => {
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    await visitor_api
      .post('/users/signup', body)
      .then(res => {
        router.push('/signin');
      })
      .catch(() => {
        alert('에러가 발생했습니다.');
      });
  };

  return (
    <Frame>
      <Title>Text me!</Title>
      <Form onSubmit={handleSubmit(signUp)}>
        <div>
          <FormTitle>회원가입하고 내 방 만들기</FormTitle>
          <Description>이메일과 비밀번호는 잊어버리면 찾을 수 없습니다.</Description>
        </div>
        <InputContainer>
          <Input
            {...register('name', {
              required: '닉네임을 입력해주세요.',
              maxLength: {
                value: 10,
                message: '닉네임은 10자를 초과하면 안됩니다.',
              },
            })}
            placeholder="닉네임을 입력해주세요."
          />
          {errors.name && <em>{errors.name.message}</em>}
        </InputContainer>
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
        <InputContainer>
          <Input
            type="password"
            {...register('passwordConfirm', {
              required: '비밀번호 확인을 입력해주세요.',
              validate: value => value === passwordField || '비밀번호와 비밀번호 확인이 다릅니다.',
            })}
            placeholder="비밀번호 확인"
          />
          {errors.passwordConfirm && <em>{errors.passwordConfirm.message}</em>}
        </InputContainer>
        <LeftButton type="submit">확인</LeftButton>
      </Form>
    </Frame>
  );
}

export default SignUp;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  ${LeftButton} {
    margin-top: 55px;
  }
`;
