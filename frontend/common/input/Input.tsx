import { InputHTMLAttributes } from "react";
import { StyledComponent } from "styled-components";
import { DefaultLabel, DefaultInput } from "./InputStyle";

interface InputProps {
  props: InputHTMLAttributes<HTMLInputElement>;
  errorMessage?: string;
  style?: {
    Label: StyledComponent<"label", any>;
    Input: StyledComponent<"input", any>;
  };
}

const defaultStyle = {
  Label: DefaultLabel,
  Input: DefaultInput,
};

const Input = ({ props, errorMessage, style = defaultStyle }: InputProps) => {
  return (
    <style.Label>
      <style.Input {...props} />
      {errorMessage && <em>{errorMessage}</em>}
    </style.Label>
  );
};

export default Input;
