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
import { GreenLeftCorner, GreenRightCorner } from "../button/ButtonStyle";
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
  Style?: StyledComponent<"form", any>;
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
  Style = Default,
}: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Style onSubmit={handleSubmit(onSubmit)}>
      {children}
      <div>
        {Object.entries(inputs).map(([name, input]: [string, InputType]) => (
          <Input
            key={name}
            props={formAdaptor({ register, name, input })}
            errorMessage={String(errors[name]?.message || "")}
          />
        ))}
      </div>
      <Button props={{ type: "submit" }} Style={GreenLeftCorner}>
        {buttonText}
      </Button>
    </Style>
  );
};

export default Form;
