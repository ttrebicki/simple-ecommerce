import { uri } from "../constants/uri";
import { IProduct } from "../types/product";
import { fetcher } from "./fetcher";

export const productApi = {
  getProduct: async (id: number): Promise<IProduct | undefined> => {
    try {
      const res = await fetcher.get(uri.getProduct(id));

      return res;
    } catch (error: unknown) {
      console.error("api.product.getProduct", error); // TODO: add some nice error handling like Toast display
    }
  },

  proxyGetProduct: async (id: number): Promise<IProduct | undefined> => {
    try {
      const res = await fetcher.get(uri.proxyGetProduct(id));

      return res;
    } catch (error: unknown) {
      console.error("api.product.proxyGetProduct", error); // TODO: add some nice error handling like Toast display
    }
  },

  searchProducts: async (
    phrase: string,
    page: number,
    limit: number
  ): Promise<IProduct[] | undefined> => {
    try {
      const res = await fetcher.get(uri.searchProducts(phrase, page, limit));

      return res;
    } catch (error: unknown) {
      console.error("api.product.searchProducts", error); // TODO: add some nice error handling like Toast display
    }
  },

  proxySearchProducts: async (
    phrase: string,
    page: number,
    limit: number
  ): Promise<IProduct[] | undefined> => {
    try {
      const res = await fetcher.get(
        uri.proxySearchProducts(phrase, page, limit)
      );

      return res;
    } catch (error: unknown) {
      console.error("api.product.proxySearchProducts", error); // TODO: add some nice error handling like Toast display
    }
  },
};
