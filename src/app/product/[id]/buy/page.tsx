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
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { stripe } from "@/lib/api/stripe";
import { useGetClientSecret } from "@/lib/hooks/useGetClientSecret";
import { appearance } from "@/lib/constants/stripe";
import { interUrl } from "@/lib/constants/fonts";

export default function Page({ params }: PageProps) {
  const [productId, setId] = useState<number>();
  const buyStore = useBuyStore();
  const { clientSecret } = useGetClientSecret(buyStore.items);
  const { data: product, isLoading } = useSWR(
    [productId],
    productApi.proxyGetProduct
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

  return (
    <Main>
      {isLoading ? (
        <Loader />
      ) : !product ? null : (
        <div className={"flex flex-col gap-8"}>
          <h2>Your items:</h2>
          <Item
            item={{
              ...product,
              quantity:
                buyStore.items.find((i) => i.id === product.id)?.quantity || 0,
            }}
            {...buyStore}
          />
          {clientSecret && (
            <CheckoutProvider
              key={clientSecret}
              stripe={stripe}
              options={{
                elementsOptions: { appearance, fonts: [{ cssSrc: interUrl }] },
                fetchClientSecret: async () => clientSecret,
              }}
            >
              <div className={"flex flex-col gap-8"}>
                <h2>Fill in the form to complete the order</h2>
                <Buy />
              </div>
            </CheckoutProvider>
          )}
        </div>
      )}
    </Main>
  );
}
