"use client";

import { ICartItemProps } from "./types";
import Image from "next/image";
import { Button } from "@/ui/reusable/Button";
import { useCartStore } from "@/lib/hooks/useCartStore";
import { Card } from "@radix-ui/themes";
import Link from "next/link";
import { ICartState } from "@/lib/types/cart";
import { useEffect } from "react";

const Item = ({ item, add, decrement, remove }: ICartItemProps) => {
  const { imageUrl, name, quantity, price, id } = item;

  return (
    <li className={"flex flex-1"}>
      <Card
        style={{ display: "flex", flexDirection: "row" }} // TODO: just create own component instead
        className={"flex flex-1 justify-between items-center"}
      >
        <Link href={`/product/${id}`} className={"flex flex-1"}>
          {" "}
          <div className={"flex flex-2 gap-4 items-center"}>
            <Image
              width={120}
              height={120}
              src={imageUrl}
              alt={name}
              className={"object-contain"}
            />
            <h2>{name}</h2>{" "}
          </div>
        </Link>
        <div className={"flex flex-1 gap-4 items-center justify-center"}>
          <Button onClick={() => decrement(id)} variant="outlined">
            {"-"}
          </Button>
          <h3>{quantity}</h3>
          <Button
            onClick={() => add({ ...item, quantity: 1 })}
            variant="outlined"
          >
            {"+"}
          </Button>
        </div>
        <h3 className="flex flex-1 justify-center">
          €{(quantity * price).toFixed(2)}
        </h3>
        <Button onClick={() => remove(id)}>{"X"}</Button>
      </Card>
    </li>
  );
};

const Items = ({
  items,
  add,
  decrement,
  remove,
}: Omit<ICartState, "clear">) => {
  return (
    <ul className={"flex flex-col gap-2"}>
      {items.map((item, index) => (
        <Item
          key={`cart-product-${item.id}-${index}`}
          item={item}
          add={add}
          decrement={decrement}
          remove={remove}
        />
      ))}
    </ul>
  );
};

export const CartItems = () => {
  const { items, add, decrement, remove, clear } = useCartStore();

  return (
    <div className={"flex flex-col gap-4"}>
      {items.length ? (
        <Items items={items} add={add} decrement={decrement} remove={remove} />
      ) : (
        <>
          <h2>{"Your cart looks empty."}</h2>
          <p>{"Try adding some products."}</p>
        </>
      )}
      {!!items.length && (
        <div className={"flex flex-col gap-4"}>
          <Link href={"/cart/buy"} className={"flex flex-col"}>
            <Button>{"PROCEED TO PAYMENT"}</Button>
          </Link>
          <Button variant="outlined" onClick={clear}>
            {"CLEAR"}
          </Button>
          <Link href={"/"} className={"flex flex-col"}>
            <Button variant="outlined">{"BACK TO MAINPAGE"}</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
