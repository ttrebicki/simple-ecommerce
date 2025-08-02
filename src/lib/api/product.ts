import Stripe from "stripe";
import { uri } from "../constants/uri";
import { fetcher } from "./fetcher";
import { IFormattedStripeProduct } from "../types/stripe";

export const productApi = {
  getProduct: async (
    id: number
  ): Promise<IFormattedStripeProduct | undefined> => {
    try {
      const res = await fetcher.get(uri.getProduct(id));

      return res;
    } catch (error: unknown) {
      console.error("api.product.getProduct", error); // TODO: add some nice error handling like Toast display
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
    } catch (error: unknown) {
      console.error("api.product.getProductList", error); // TODO: add some nice error handling like Toast display
    }
  },

  searchProducts: async (
    phrase: string,
    limit: number,
    page?: number
  ): Promise<
    Stripe.Response<Stripe.ApiSearchResult<IFormattedStripeProduct>> | undefined
  > => {
    try {
      const res = await fetcher.get(uri.searchProducts(phrase, limit, page));

      return res;
    } catch (error: unknown) {
      console.error("api.product.searchProducts", error); // TODO: add some nice error handling like Toast display
    }
  },
};
