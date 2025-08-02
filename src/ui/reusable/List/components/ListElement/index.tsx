import Link from "next/link";
import { IListElementProps } from "./types";
import Image from "next/image";
import { Box } from "@/ui/reusable/Box";
import { friendlyPrice } from "@/lib/helpers/friendlyPrice";

export const ListElement = ({ item }: IListElementProps) => {
  const { id, images, name, prices } = item;

  return (
    <li className={"flex flex-col relative"}>
      <Link href={`/product/${id}`}>
        <Box
          isHover
          imageSlot={
            !!images[0] && (
              <div className="relative h-[200px] w-[100%]">
                <Image
                  src={images[0]}
                  alt={name}
                  fill
                  className={"flex flex-1 object-cover"}
                />
              </div>
            )
          }
        >
          <div className={"flex flex-1 flex-col gap-2 p-2"}>
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
