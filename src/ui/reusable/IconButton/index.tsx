import { ComponentProps } from "react";

export function IconButton({ ...props }: ComponentProps<"button">) {
  return (
    <button
      className={`p-2 rounded ${
        props.disabled
          ? "opacity-50 pointer-none:"
          : "hover:bg-secondary-main cursor-pointer"
      } ${props.className}`}
      {...props}
    />
  );
}
