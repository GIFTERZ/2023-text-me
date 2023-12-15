import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { StyledComponent } from "styled-components";
import { Default } from "./ButtonStyle";

interface ButtonProps {
  children: ReactNode;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
  style?: {
    Button: StyledComponent<"button", any>;
  };
}

function Button({ children, props, style = { Button: Default } }: ButtonProps) {
  return <style.Button {...props}>{children}</style.Button>;
}

export default Button;
