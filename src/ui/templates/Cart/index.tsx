import { Main } from "@/ui/layout/Main";
import { CartItems } from "./components/CartItems";

export const Cart = () => {
  return (
    <Main>
      <h1>{"Your cart"}</h1>
      <CartItems />
    </Main>
  );
};
