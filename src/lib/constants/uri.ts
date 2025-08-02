import qs from "qs";

export const uri = {
  getProduct: (id: number) =>
    `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/product/${qs.stringify(
      { id },
      { addQueryPrefix: true }
    )}`,
  getProductList: (starting_after?: string) =>
    `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/product-list/${qs.stringify(
      { starting_after },
      { addQueryPrefix: true }
    )}`,
  searchProducts: (search: string, limit: number, page?: number) =>
    `${
      process.env.NEXT_PUBLIC_APP_URL
    }/api/stripe/products-search/${qs.stringify(
      {
        search,
        limit,
        page,
      },
      { addQueryPrefix: true }
    )}`,

  getSessionKey: `/api/stripe/session-key`,
};
