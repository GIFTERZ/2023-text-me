import { InputHTMLAttributes } from "react";
import { StyledComponent } from "styled-components";
import { Default } from "./InputStyle";

interface InputProps {
  props: InputHTMLAttributes<HTMLInputElement>;
  errorMessage?: string;
  Style?: StyledComponent<"label", any>;
}

const Input = ({ props, errorMessage, Style = Default }: InputProps) => {
  return (
    <Style>
      <input {...props} />
      {errorMessage && <em>{errorMessage}</em>}
    </Style>
  );
};

export default Input;
