export const uri = {
  getProduct: (id: number) => `/api/stripe/product/?id=${id}`,
  getProductList: (starting_after?: string) =>
    `/api/stripe/product-list/${
      starting_after ? `?starting_after=${starting_after}` : ""
    }`,
  searchProducts: (search: string, limit: number, page?: number) =>
    `/api/stripe/search/?search=${search}&limit=${limit}&page=${page}`,

  getSessionKey: `/api/stripe/session-key`,
}; // TODO: handle all of this with qs
