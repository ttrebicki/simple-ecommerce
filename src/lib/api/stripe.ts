import { loadStripe } from "@stripe/stripe-js";
import { fetcher } from "./fetcher";
import { uri } from "../constants/uri";
import { IGetClientSecretResponse } from "../types/stripe";
import { ICartProduct } from "../types/cart";
import Stripe from "stripe";

export const stripe = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const fetchClientSecret = async ({
  items,
}: {
  items: ICartProduct[];
}) => {
  const res: IGetClientSecretResponse = await fetcher.post(
    uri.getClientSecret,
    JSON.stringify({ items })
  );

  return res.checkoutSessionClientSecret;
};

export const mapCartToLineItems = (
  items: ICartProduct[]
): Stripe.Checkout.SessionCreateParams.LineItem[] => {
  return items.map((item) => ({
    price_data: {
      currency: "eur",
      product_data: {
        name: item.name,
        images: [item.imageUrl],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));
};
