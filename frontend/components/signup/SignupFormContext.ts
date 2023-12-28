import FormContext from "../../common/form/FormContext";

const SignupFormContext = new FormContext();

SignupFormContext.register(
  "name",
  {
    placeholder: "닉네임을 입력해주세요.",
  },
  {
    required: {
      value: true,
      message: "닉네임을 입력해주세요.",
    },
    maxLength: {
      value: 10,
      message: "닉네임은 10자를 초과하면 안됩니다.",
    },
  }
);

SignupFormContext.register(
  "email",
  {
    placeholder: "이메일을 입력해주세요.",
  },
  {
    required: {
      value: true,
      message: "이메일을 입력해주세요.",
    },
    pattern: {
      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
      message: "올바른 이메일 형식이 아닙니다.",
    },
  }
);

SignupFormContext.register(
  "password",
  {
    placeholder: "비밀번호를 입력해주세요.",
    type: "password",
  },
  {
    required: {
      value: true,
      message: "비밀번호를 입력해주세요.",
    },
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
  }
);

SignupFormContext.register(
  "passwordConfirm",
  {
    placeholder: "비밀번호 확인을 입력해주세요.",
    type: "password",
  },
  {
    required: {
      value: true,
      message: "비밀번호 확인을 입력해주세요.",
    },
    validate: {
      value: (v) => {
        const passwordConfirm = document.querySelector(
          "input[name='password']"
        ) as HTMLInputElement;
        return v === passwordConfirm.value || "비밀번호 확인 값이 다릅니다.";
      },
    },
  }
);

export default SignupFormContext;
