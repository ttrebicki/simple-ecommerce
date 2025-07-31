import { IButtonProps } from "./types";

export const Button = ({
  padding = 2,
  variant = "contained",
  ...props
}: IButtonProps) => {
  const variantCn =
    variant === "contained"
      ? "bg-primary-main hover:bg-secondary-main text-text"
      : "border border-primary-main hover:bg-secondary-main";

  return (
    <button
      {...props}
      className={`${variantCn} cursor-pointer rounded-sm p-${padding} ${props.className}`}
    />
  );
};
