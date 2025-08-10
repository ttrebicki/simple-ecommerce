import Search from "@/ui/templates/Search";
import { PageProps } from "../../.next/types/app/page";

export const revalidate = 60;

export default async function Page({ searchParams }: PageProps) {
  return <Search searchParams={searchParams} />;
}
