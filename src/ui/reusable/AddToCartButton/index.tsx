"use client";

import { useCartStore } from "@/lib/hooks/useCartStore";
import { Button } from "../Button";
import { IAddToCartButton } from "./types";

export const AddToCartButton = ({ product, ...props }: IAddToCartButton) => {
  const { add } = useCartStore();

  return (
    <Button onClick={() => add(product)} {...props}>
      {"Add to cart"}
    </Button>
  );
};
