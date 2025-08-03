"use client";

import { useCartStore } from "@/lib/hooks/useCartStore";
import { Button } from "../Button";
import { IAddToCartButton } from "./types";
import toast from "react-hot-toast";
import { toastError } from "@/lib/helpers/toastError";

export const AddToCartButton = ({ product, ...props }: IAddToCartButton) => {
  const { add, items } = useCartStore();
  const isInCart = items.find((i) => product.id === i.id);

  const handleAddToCart = () => {
    try {
      if (!isInCart) {
        add(product);
        toast.success(`${product.name} added to cart.`);
      }
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <Button
      disabled={!!isInCart}
      variant={"outlined"}
      onClick={handleAddToCart}
      {...props}
    >
      {isInCart ? "Added to cart!" : "Add to cart"}
    </Button>
  );
};
