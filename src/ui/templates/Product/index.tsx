import { Main } from "@/ui/layout/Main";
import { PageProps } from "../../../../.next/types/app/page";
import { productApi } from "@/lib/api/product";
import { Card } from "@radix-ui/themes";
import Image from "next/image";

export default async function Product({ params }: PageProps) {
  const { id } = await params;
  const product = await productApi.getProduct(id);

  if (!product) return null;

  const { imageUrl, name, description, price, amount } = product;

  return (
    <Main>
      <h1>{name}</h1>
      <div className={"flex flex-1 gap-4 flex-col md:flex-row"}>
        <Card className={"flex-2"} size={"5"}>
          <p className={"text-2xl"}>{description}</p>
        </Card>
        <Card className={"flex flex-1 flex-col gap-4"}>
          <Image
            className={"flex-1 h-[350px] object-cover"}
            src={imageUrl}
            alt={name}
            width={350}
            height={350}
          />
        </Card>
      </div>
      <Card size={"5"}>
        <p className={"text-5xl block"}>
          {amount > 0 ? `Cena: ${price} zł` : "Aktualnie niedostępny"}
        </p>
      </Card>
    </Main>
  );
}
