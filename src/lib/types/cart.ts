import { IFormattedStripeProduct } from "./stripe";

export interface ICartProduct extends IFormattedStripeProduct {
  quantity: number;
}

export interface ICartState {
  items: ICartProduct[];
  add: (item: ICartProduct) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}
