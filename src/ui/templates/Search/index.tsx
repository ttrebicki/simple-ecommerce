import { List } from "@/ui/reusable/List";
import { SearchForm } from "./components/SearchForm";
import { productApi } from "@/lib/api/product";
import { Main } from "@/ui/layout/Main";
import { PageProps } from "../../../../.next/types/app/page";

export default async function Search({ searchParams }: PageProps) {
  const { search } = await searchParams;
  const phrase = typeof search === "string" ? search : "";
  const isPhrase = !!phrase.length;
  const res = isPhrase
    ? await productApi.searchProducts(phrase, 12)
    : await productApi.getProductList();

  return (
    <Main>
      <h1>{"simple-ecommerce"}</h1>
      <SearchForm />
      {!!res?.data.length && (
        <List
          initialData={res.data}
          phrase={phrase}
          hasMore={res.has_more}
          nextPage={isPhrase && "next_page" in res ? res.next_page : undefined}
        />
      )}
    </Main>
  );
}
