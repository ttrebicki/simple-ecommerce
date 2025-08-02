import { IFormattedStripeProduct } from "@/lib/types/stripe";
import { IButtonProps } from "../Button/types";

export interface IAddToCartButton extends IButtonProps {
  product: IFormattedStripeProduct & { quantity: number };
}
