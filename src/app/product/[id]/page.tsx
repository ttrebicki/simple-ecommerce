import Product from "@/ui/templates/Product";
import { PageProps } from "../../../../.next/types/app/page";

export default async function Page({ params }: PageProps) {
  return <Product params={params} />;
}
