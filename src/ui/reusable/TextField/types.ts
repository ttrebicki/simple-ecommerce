import { InputHTMLAttributes, PropsWithoutRef } from "react";

export interface TextFieldProps
  extends PropsWithoutRef<InputHTMLAttributes<HTMLInputElement>> {
  /** Label text (required for accessibility) */
  label: string;
  /** Optional hint shown below the input */
  description?: string;
  /** Error message; if present, styles the input as invalid */
  error?: string;
}
