import { DEFAULT_LIST_COLS } from "@/lib/constants/ui";
import { ListElement } from "./components/ListElement";
import { IListProps } from "./types";

export const List = ({ data }: IListProps) => {
  const colClasses = Object.entries(DEFAULT_LIST_COLS)
    .map(([bp, cols]) =>
      bp === "base" ? `grid-cols-${cols}` : `${bp}:grid-cols-${cols}`
    )
    .join(" ");

  const gridClasses = ["grid", colClasses, `gap-y-4`, `gap-x-4`]
    .filter(Boolean)
    .join(" ");

  return (
    <ul className={gridClasses}>
      {data.map((item) => (
        <ListElement item={item} />
      ))}
    </ul>
  );
};
