import { List } from "@/ui/reusable/List";
import { SearchForm } from "./components/SearchForm";
import { productApi } from "@/lib/api/product";
import { Main } from "@/ui/layout/Main";
import { PageProps } from "../../../../.next/types/app/page";

export default async function Search({ searchParams }: PageProps) {
  const { search } = await searchParams;
  const phrase = typeof search === "string" ? search : "";
  const products = !!phrase.length
    ? await productApi.getProductList()
    : await productApi.searchProducts(phrase, 12);

  return (
    <Main>
      <h1 className={"text-shadow"}>{"simple-ecommerce"}</h1>
      <SearchForm />
      {!!products?.data.length && (
        <List
          initialData={products.data}
          phrase={phrase}
          hasMore={products.has_more}
        />
      )}
    </Main>
  );
}
