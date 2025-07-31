export const uri = {
  getProduct: (id: number) => `${process.env.API_URL}/products/${id}`,
  searchProducts: (search: string, page: number, limit: number) =>
    `${process.env.API_URL}/products/?search=${search}&page=${page}&limit=${limit}`,

  proxySearchProducts: (search: string, page: number, limit: number) =>
    `/api/proxy-products/?search=${search}&page=${page}&limit=${limit}`,
};
