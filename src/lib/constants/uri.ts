export const uri = {
  getProduct: (id: number) => `${process.env.API_URL}/products/${id}`,
  searchProducts: (search: string) =>
    `${process.env.API_URL}/products/?search=${search}`,
};
