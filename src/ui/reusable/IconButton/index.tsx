import { ComponentProps } from "react";

export function IconButton({ ...props }: ComponentProps<"button">) {
  return (
    <button
      className="p-2 rounded hover:bg-secondary-main cursor-pointer"
      {...props}
    />
  );
}
