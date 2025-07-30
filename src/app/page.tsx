import { IPageProps } from "@/lib/types/router";
import Search from "@/ui/templates/Search";

export default function Page({ searchParams }: IPageProps) {
  return <Search searchParams={searchParams} />;
}
