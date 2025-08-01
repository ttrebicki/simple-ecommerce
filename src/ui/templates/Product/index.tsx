import { Main } from "@/ui/layout/Main";
import { productApi } from "@/lib/api/product";
import Image from "next/image";
import { List } from "@/ui/reusable/List";
import Link from "next/link";
import { Button } from "@/ui/reusable/Button";
import { AddToCartButton } from "@/ui/reusable/AddToCartButton";
import { PageProps } from "../../../../.next/types/app/page";
import { Box } from "@/ui/reusable/Box";

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
        <Box className={"flex-2 p-8"}>
          <p className={"text-2xl"}>{description}</p>
        </Box>
        <Image
          className={"flex-1 h-[350px] object-contain rounded-sm"}
          src={imageUrl}
          alt={name}
          width={350}
          height={350}
        />
      </div>
      <Box direction={"row"} className="p-8">
        <div className={"flex flex-1 justify-between items-center"}>
          <p className={"text-2xl"}>
            {amount > 0 ? `Price: €${price}` : "Currently unavailable"}
          </p>
          <div className={"flex gap-4"}>
            <Link href={`/product/${product.id}/buy`}>
              <Button padding={4}>{"Buy now"}</Button>
            </Link>
            <AddToCartButton
              product={{
                quantity: 1,
                id: product.id,
                imageUrl: product.imageUrl,
                name: product.name,
                price: product.price,
              }}
              variant="outlined"
              padding={4}
            />
          </div>
        </div>
      </Box>
      {relatedProducts && (
        <div className="flex flex-col">
          <h2>Similar</h2>
          <List initialData={relatedProducts} limit={4} isFetchMoreDisabled />
        </div>
      )}
    </Main>
  );
}
