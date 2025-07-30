import Search from "@/ui/templates/Search";
import { PageProps } from "../../.next/types/app/page";

export default function Page({ searchParams }: PageProps) {
  return <Search searchParams={searchParams} />;
}
