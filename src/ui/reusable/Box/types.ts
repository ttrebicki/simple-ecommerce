import { PropsWithChildren, ReactNode } from "react";

export interface IBoxProps extends PropsWithChildren {
  direction?: "row" | "col";
  className?: string;
  contentClassName?: string;
  imageSlot?: ReactNode;
  isHover?: boolean;
}
