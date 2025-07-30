import Link from "next/link";
import { IListElementProps } from "./types";
import Image from "next/image";
import { Card } from "@radix-ui/themes";

export const ListElement = ({ item }: IListElementProps) => {
  const { id, imageUrl, name, price } = item;

  return (
    <li className={"flex flex-col relative max-h-[400px]"}>
      <Link href={`/product/${id}`}>
        <Card variant="surface" size={"1"}>
          <Image
            src={imageUrl}
            alt={name}
            width={300}
            height={300}
            className={"flex flex-1 h-[300px] object-cover"}
          />
          <div className={"flex flex-1 flex-col gap-2 p-2"}>
            <div>
              <span>{name}</span>
            </div>
            <div>
              <span>{price} zł</span>
            </div>
          </div>
        </Card>
      </Link>
    </li>
  );
};
