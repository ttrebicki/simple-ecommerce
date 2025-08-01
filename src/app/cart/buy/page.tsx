"use client";
import { stripe } from "@/lib/api/stripe";
import { interUrl } from "@/lib/constants/fonts";
import { appearance } from "@/lib/constants/stripe";
import { useCartStore } from "@/lib/hooks/useCartStore";
import { useGetClientSecret } from "@/lib/hooks/useGetClientSecret";
import { Main } from "@/ui/layout/Main";
import Buy from "@/ui/templates/Buy";
import { Items } from "@/ui/templates/Cart/components/CartItems";
import { CheckoutProvider } from "@stripe/react-stripe-js";

export default function CartBuy() {
  const cartStore = useCartStore();
  const { clientSecret } = useGetClientSecret(cartStore.items);

  return (
    <Main>
      <div className="flex flex-col gap-8">
        <h2>Your items:</h2>
        <Items {...cartStore} />
        {clientSecret && (
          <CheckoutProvider
            stripe={stripe}
            key={clientSecret}
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
    </Main>
  );
}
