import { List } from "@/ui/reusable/List";
import { SearchForm } from "./components/SearchForm";
import { productApi } from "@/lib/api/product";
import { ISearchProps } from "./types";
import { Main } from "@/ui/layout/Main";

export default async function Search({ searchParams }: ISearchProps) {
  const { search } = await searchParams;
  const phrase = typeof search === "string" ? search : "";
  const data = await productApi.searchProducts(phrase);

  return (
    <Main>
      <h1>{"simple-ecommerce"}</h1>
      <SearchForm />
      {data && <List data={data} />}
    </Main>
  );
}
