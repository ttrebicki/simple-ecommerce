import Link from "next/link";
import { IListElementProps } from "./types";
import Image from "next/image";
import { Box } from "@/ui/reusable/Box";
import { friendlyPrice } from "@/lib/helpers/friendlyPrice";

export const ListElement = ({ item }: IListElementProps) => {
  const { id, images, name, prices } = item;

  return (
    <li className={"flex flex-col relative h-[300px]"}>
      <Link href={`/product/${id}`} className={"h-full"}>
        <Box
          isHover
          imageSlot={
            !!images[0] && (
              <div className="relative w-[100%]">
                <Image
                  src={images[0]}
                  alt={name}
                  fill
                  className={"flex object-cover"}
                />
              </div>
            )
          }
          contentClassName={"bg-background"}
        >
          <div className={"flex flex-1 flex-col gap-2"}>
            <div>
              <span>{name}</span>
            </div>
            {prices[0] && (
              <div>
                <span>{friendlyPrice(prices[0])}</span>
              </div>
            )}
          </div>
        </Box>
      </Link>
    </li>
  );
};
