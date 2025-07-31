import { List } from "@/ui/reusable/List";
import { SearchForm } from "./components/SearchForm";
import { productApi } from "@/lib/api/product";
import { Main } from "@/ui/layout/Main";
import { PageProps } from "../../../../.next/types/app/page";

export default async function Search({ searchParams }: PageProps) {
  const { search } = await searchParams;
  const phrase = typeof search === "string" ? search : "";
  const data = await productApi.searchProducts(phrase, 1, 12);

  return (
    <Main>
      <h1>{"simple-ecommerce"}</h1>
      <SearchForm />
      {data && <List initialData={data} phrase={phrase} />}
    </Main>
  );
}
