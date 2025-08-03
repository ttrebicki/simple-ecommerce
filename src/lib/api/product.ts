import Stripe from "stripe";
import { uri } from "../constants/uri";
import { fetcher } from "./fetcher";
import { IFormattedStripeProduct } from "../types/stripe";
import { toastError } from "../helpers/toastError";

export const productApi = {
  getProduct: async (
    id: number
  ): Promise<IFormattedStripeProduct | undefined> => {
    try {
      const res = await fetcher.get(uri.getProduct(id));

      return res;
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  },

  getProductList: async (
    starting_after?: string
  ): Promise<
    Stripe.Response<Stripe.ApiList<IFormattedStripeProduct>> | undefined
  > => {
    try {
      const res = await fetcher.get(uri.getProductList(starting_after));

      return res;
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  },

  searchProducts: async (
    phrase: string,
    limit: number,
    page?: string
  ): Promise<
    Stripe.Response<Stripe.ApiSearchResult<IFormattedStripeProduct>> | undefined
  > => {
    try {
      const res = await fetcher.get(uri.searchProducts(phrase, limit, page));

      return res;
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  },
};
