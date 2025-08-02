"use client";

import { useCartStore } from "@/lib/hooks/useCartStore";
import { Button } from "../Button";
import { IAddToCartButton } from "./types";

export const AddToCartButton = ({ product, ...props }: IAddToCartButton) => {
  const { add, items } = useCartStore();
  const isInCart = items.find((i) => product.id === i.id);

  return (
    <Button
      disabled={!!isInCart}
      variant={"outlined"}
      onClick={!isInCart ? () => add(product) : undefined}
      {...props}
    >
      {isInCart ? "Added to cart!" : "Add to cart"}
    </Button>
  );
};
