import { ICartProduct } from "@/lib/types/cart";
import { IButtonProps } from "../Button/types";

export interface IAddToCartButton extends IButtonProps {
  product: ICartProduct;
}
