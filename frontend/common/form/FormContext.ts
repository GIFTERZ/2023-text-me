import { InputHTMLAttributes } from "react";
import { RegisterOptions } from "react-hook-form";
import deepCopy from "../../utils/deepCopy";

interface InputContextReturn {
  [name: string]: {
    attributes: InputHTMLAttributes<HTMLInputElement>;
    validate?: RegisterOptions;
  };
}

class FormContext {
  private context: InputContextReturn;

  constructor() {
    this.context = {};
  }

  makeInputContext(
    name: string,
    attributes: InputHTMLAttributes<HTMLInputElement>,
    validate?: RegisterOptions
  ) {
    return { [name]: { attributes, validate } };
  }

  register(
    name: string,
    attributes: InputHTMLAttributes<HTMLInputElement>,
    validate?: RegisterOptions
  ) {
    this.context = {
      ...this.context,
      ...this.makeInputContext(name, attributes, validate),
    };
  }

  getContext() {
    return deepCopy(this.context);
  }
}

export default FormContext;
