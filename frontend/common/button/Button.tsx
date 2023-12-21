import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { StyledComponent } from "styled-components";
import { Default } from "./ButtonStyle";

interface ButtonProps {
  children: ReactNode;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
  Style?: StyledComponent<"button", any>;
}

function Button({ children, props, Style = Default }: ButtonProps) {
  return <Style {...props}>{children}</Style>;
}

export default Button;
