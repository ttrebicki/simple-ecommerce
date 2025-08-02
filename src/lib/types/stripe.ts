import { StripeCheckoutContact } from "@stripe/stripe-js";
import { ICartProduct } from "./cart";
import Stripe from "stripe";

export interface IStripePaymentBody {
  items: ICartProduct[];
}

export interface ISessionKeyResponse {
  sessionKey: string | null;
}

export interface IStripeForm {
  email?: string;
  phoneNumber?: string;
  billingAddress?: StripeCheckoutContact;
  shippingAddress?: StripeCheckoutContact;
}

export interface IPrice {
  currency: string;
  unit_amount: number | null;
  id: string;
}

export interface IFormattedStripeProduct extends Stripe.Product {
  prices: IPrice[];
}
