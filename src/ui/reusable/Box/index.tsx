import { IBoxProps } from "./types";

export const Box = ({
  children,
  direction = "col",
  className,
  contentClassName,
  imageSlot,
  isHover,
}: IBoxProps) => {
  return (
    <div
      className={`flex flex-1 flex-${direction} border-1 border-text rounded-xl relative overflow-hidden ${
        isHover ? "hover:opacity-80" : ""
      } ${direction === "row" ? "justify-center items-center" : ""} ${
        "h-full " + (className || "") || "h-full"
      }`}
    >
      {imageSlot && (
        <div
          className={`flex flex-1 overflow-hidden relative ${
            direction === "row" ? "h-[100%] basis-1/6" : "basis-3/5"
          }`}
        >
          {imageSlot}
        </div>
      )}
      <div
        className={`flex flex-1  ${
          direction === "row"
            ? "flex-row basis-5/6 justify-center items-center"
            : "flex-col basis-2/5"
        }
        } p-4 ${contentClassName || ""}`}
      >
        {children}
      </div>
    </div>
  );
};
