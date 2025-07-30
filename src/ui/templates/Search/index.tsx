import { List } from "@/ui/reusable/List";
import { SearchForm } from "./components/SearchForm";
import { productApi } from "@/lib/api/product";
import { PageProps } from "../../../../.next/types/app/page";

export default async function Search({ searchParams }: PageProps) {
  const { search } = await searchParams;
  const phrase = typeof search === "string" ? search : "";
  const data = await productApi.searchProducts(phrase);

  return (
    <div className={"flex flex-1 flex-col gap-4"}>
      <SearchForm />
      {data && <List data={data} />}
    </div>
  );
}
