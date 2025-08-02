"use client";
import { useBuyStore } from "@/lib/hooks/useBuyStore";
import Buy from "@/ui/templates/Buy";
import { Item } from "@/ui/templates/Cart/components/CartItems";
import useSWR from "swr";
import { productApi } from "@/lib/api/product";
import Loader from "@/ui/reusable/Loader";
import { Main } from "@/ui/layout/Main";
import { PageProps } from "../../../../../.next/types/app/product/[id]/buy/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }: PageProps) {
  const router = useRouter();
  const [productId, setId] = useState<string>();
  const buyStore = useBuyStore();
  const productFromStore = buyStore.items.find((i) => i.id === productId);
  const { data: product, isLoading } = useSWR(
    productId || null,
    productApi.getProduct
  );

  useEffect(() => {
    (async () => {
      try {
        const { id } = await params;
        setId(id);
      } catch (error: unknown) {
        console.error(error);
      }
    })();
  }, [params]);

  useEffect(() => {
    if (!productFromStore && product) buyStore.add({ ...product, quantity: 1 });
  }, [product]);

  useEffect(() => {
    if (productFromStore && productFromStore.quantity < 1) {
      buyStore.remove(productFromStore.id);
      router.push(`/product/${productId}`);
    }
  }, [productFromStore?.quantity]);

  return (
    <Main>
      {isLoading ? (
        <Loader />
      ) : !product ? null : (
        <div className={"flex flex-col gap-8"}>
          <h2>{"Your items:"}</h2>
          <Item
            item={{
              ...product,
              quantity: productFromStore?.quantity || 0,
            }}
            {...buyStore}
          />
          {productFromStore && (
            <div className={"flex flex-col gap-8"}>
              <h2>{"Fill in the form to complete the order"}</h2>
              <Buy products={[productFromStore]} />
            </div>
          )}
        </div>
      )}
    </Main>
  );
}
