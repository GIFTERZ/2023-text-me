import FormContext from "../../common/form/FormContext";

const EmailFormContext = new FormContext();

EmailFormContext.register(
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

export default EmailFormContext;
