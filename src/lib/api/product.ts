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

  searchProducts: async (phrase: string): Promise<IProduct[] | undefined> => {
    try {
      const res = await fetcher.get(uri.searchProducts(phrase));

      return res;
    } catch (error: unknown) {
      console.error("api.product.searchProducts", error); // TODO: add some nice error handling like Toast display
    }
  },
};
