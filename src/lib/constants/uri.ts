export const uri = {
  // PRODUCT
  getProduct: (id: number) => `${process.env.API_URL}/products/${id}`,
  searchProducts: (search: string, page: number, limit: number) =>
    `${process.env.API_URL}/products/?search=${search}&page=${page}&limit=${limit}`,

  proxyGetProduct: (id: number) => `/api/proxy-product/?id=${id}`,
  proxySearchProducts: (search: string, page: number, limit: number) =>
    `/api/proxy-products/?search=${search}&page=${page}&limit=${limit}`,

  // STRIPE
  getClientSecret: `/api/stripe/get-client-secret`,
};
