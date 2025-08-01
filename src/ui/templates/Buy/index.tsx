"use client";

import { stripe } from "@/lib/api/stripe";
import { interUrl } from "@/lib/constants/fonts";
import { appearance } from "@/lib/constants/stripe";
import { IStripeForm } from "@/lib/types/stripe";
import { Box } from "@/ui/reusable/Box";
import Loader from "@/ui/reusable/Loader";
import { TextField } from "@/ui/reusable/TextField";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { Payment } from "./components/Payment";
import { useGetClientSecret } from "@/lib/hooks/useGetClientSecret";
import { ICartProduct } from "@/lib/types/cart";

export default function Buy({ products }: { products: ICartProduct[] }) {
  const { watch, register } = useForm<IStripeForm>();
  const { clientSecret, isSecretLoading } = useGetClientSecret(products);

  const email = watch("email");
  const billingAddress = watch("billingAddress");
  const shippingAddress = watch("shippingAddress");

  return (
    <form className="flex flex-1 flex-col gap-8">
      <Box>
        <div className="flex flex-1 flex-col md:flex-row gap-6">
          <div className="flex flex-1  flex-col gap-1">
            <TextField label={"Email"} {...register("email")} />
            <TextField
              label={"Full name"}
              {...register("billingAddress.name")}
            />
            <TextField
              label={"Address"}
              {...register("billingAddress.address.line1")}
            />
            <TextField
              label={"Address (line 2)"}
              {...register("billingAddress.address.line2")}
            />
            <TextField
              label={"City"}
              {...register("billingAddress.address.city")}
            />
            <TextField
              label={"Postal code"}
              {...register("billingAddress.address.postal_code")}
            />
            <TextField
              disabled
              defaultValue={"PL"}
              label={"City"}
              {...register("billingAddress.address.country")}
            />
          </div>
        </div>
      </Box>
      <Box contentClassName={"gap-8 flex flex-1"}>
        {isSecretLoading && <Loader />}
        {clientSecret && !isSecretLoading && (
          <CheckoutProvider
            key={clientSecret}
            stripe={stripe}
            options={{
              elementsOptions: { appearance, fonts: [{ cssSrc: interUrl }] },
              fetchClientSecret: async () => clientSecret,
            }}
          >
            <Payment
              email={email}
              billingAddress={billingAddress}
              shippingAddress={shippingAddress}
            />
          </CheckoutProvider>
        )}
      </Box>
    </form>
  );
}
