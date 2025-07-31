import { Main } from "@/ui/layout/Main";
import { PageProps } from "../../../../.next/types/app/page";
import { productApi } from "@/lib/api/product";
import { Button, Card } from "@radix-ui/themes";
import Image from "next/image";
import { List } from "@/ui/reusable/List";
import Link from "next/link";

export default async function Product({ params }: PageProps) {
  const { id } = await params;
  const product = await productApi.getProduct(id);

  if (!product) return null;

  const { imageUrl, name, description, price, amount } = product;
  const splitName = name.split(" ");
  const relatedProducts = await productApi.searchProducts(
    splitName[splitName.length - 1],
    1,
    4
  );

  return (
    <Main>
      <h1>{name}</h1>
      <div className={"flex flex-1 gap-4 flex-col md:flex-row"}>
        <Card className={"flex-2"} size={"4"}>
          <p className={"text-2xl"}>{description}</p>
        </Card>
        <Image
          className={"flex-1 h-[350px] object-cover rounded-sm"}
          src={imageUrl}
          alt={name}
          width={350}
          height={350}
        />
      </div>
      <Card size={"4"}>
        <div className={"flex justify-between items-center"}>
          <p className={"text-2xl"}>
            {amount > 0 ? `Cena: ${price} zł` : "Aktualnie niedostępny"}
          </p>
          <Link href={`/product/${id}/buy`}>
            <Button size={"4"} style={{ cursor: "pointer" }}>
              {"Kup teraz"}
            </Button>
          </Link>
        </div>
      </Card>
      {relatedProducts && (
        <div className="flex flex-col">
          <h2>Podobne</h2>
          <List initialData={relatedProducts} limit={4} isFetchMoreDisabled />
        </div>
      )}
    </Main>
  );
}
