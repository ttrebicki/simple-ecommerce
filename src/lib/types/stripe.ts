import { StripeCheckoutContact } from "@stripe/stripe-js";
import { ICartProduct } from "./cart";
import { UseFormHandleSubmit } from "react-hook-form";

export interface ILineItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
    };
    unit_amount: number;
  };
  quantity: number;
}

export interface IStripePaymentBody {
  items: ICartProduct[];
}

export interface IGetClientSecretResponse {
  checkoutSessionClientSecret: string;
}

export interface IStripeForm {
  email?: string;
  phoneNumber?: string;
  billingAddress?: StripeCheckoutContact;
  shippingAddress?: StripeCheckoutContact;
  handleSubmit: UseFormHandleSubmit<IStripeForm, IStripeForm>;
}
