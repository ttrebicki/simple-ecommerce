import { ListElement } from "./components/ListElement";
import { IListProps } from "./types";

export const List = ({ data }: IListProps) => {
  const gridClasses = [
    "grid",
    "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    `gap-y-4`,
    `gap-x-4`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ul className={gridClasses}>
      {data.map((item) => (
        <ListElement key={`product-${item.id}`} item={item} />
      ))}
    </ul>
  );
};
