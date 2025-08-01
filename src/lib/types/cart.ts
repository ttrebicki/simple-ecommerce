import { IProduct } from "./product";

export interface ICartProduct extends Omit<IProduct, "description" | "amount"> {
  quantity: number;
}

export interface ICartState {
  items: ICartProduct[];
  add: (item: ICartProduct) => void;
  decrement: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
}
