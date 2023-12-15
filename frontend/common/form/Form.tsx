import { InputHTMLAttributes, ReactNode } from "react";
import {
  FieldValue,
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { StyledComponent } from "styled-components";
import Button from "../button/Button";
import { GreenRightCorner } from "../button/ButtonStyle";
import Input from "../input/Input";
import { Default } from "./FormStyle";

type InputType = {
  attributes: InputHTMLAttributes<HTMLInputElement>;
  validate: { [option: string]: RegisterOptions };
};

interface FormProps {
  children?: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  inputs: {
    [name: string]: InputType;
  };
  buttonText: string;
  style?: {
    Form: StyledComponent<"form", any>;
  };
}

type FormAdaptorProps = {
  register: UseFormRegister<FieldValue<FieldValues>>;
  input: InputType;
  name: string;
};

const formAdaptor = ({ register, input, name }: FormAdaptorProps) => {
  const { validate, attributes } = input;
  return { ...register(name, { ...validate }), ...attributes };
};

const Form = ({
  children,
  onSubmit,
  inputs,
  buttonText,
  style = { Form: Default },
}: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <style.Form onSubmit={handleSubmit(onSubmit)}>
      {children}
      {Object.entries(inputs).map(([name, input]: [string, InputType]) => (
        <Input
          key={name}
          props={formAdaptor({ register, name, input })}
          errorMessage={String(errors[name]?.message || "")}
        />
      ))}
      <Button props={{ type: "submit" }} style={{ Button: GreenRightCorner }}>
        {buttonText}
      </Button>
    </style.Form>
  );
};

export default Form;
