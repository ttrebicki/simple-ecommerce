import { PropsWithChildren } from "react";

export const Main = ({ children }: PropsWithChildren) => {
  return (
    <div className={"flex flex-1 flex-col gap-4 bg-transparent"}>
      {children}
    </div>
  );
};
