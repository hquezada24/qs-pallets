import { ReactNode } from "react";

export type Option = {
  key: string;
  label: string;
  value: string;
};

export type Col = {
  key: string;
  label: string;
  type: string;
  inputType?: string;
  leftOperand?: string;
  rightOperand?: string;
  options?: Option[] | string[];
  placeholder?: string;
  message?: string;
  default?: string;
};

export interface FormProps {
  inputs: Col[];
  // handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void | Promise<void>;
  submitType: string;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmitStatus: React.Dispatch<React.SetStateAction<string>>;
  path: string;
  products: boolean;
  options?: Record<string, unknown>;
}
