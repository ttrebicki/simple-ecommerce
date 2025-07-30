import Link from "next/link";
import { IListElementProps } from "./types";
import Image from "next/image";

export const ListElement = ({ item }: IListElementProps) => {
  const { id, imageUrl, name, price } = item;

  return (
    <li className={"flex flex-col"}>
      <Link href={`/product/${id}`}>
        <Image src={imageUrl} alt={name} />
        <div className={"flex flex-col gap-2 p-2"}>
          <div>
            <span>{name}</span>
          </div>
          <div>
            <span>{price} zł</span>
          </div>
        </div>
      </Link>
    </li>
  );
};
