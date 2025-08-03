"use client";

import { stripeClient } from "@/lib/api/stripe";
import { interUrl } from "@/lib/constants/fonts";
import { appearance } from "@/lib/constants/stripe";
import { Box } from "@/ui/reusable/Box";
import Loader from "@/ui/reusable/Loader";
import { TextField } from "@/ui/reusable/TextField";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { Payment } from "./components/Payment";
import { useSessionKey } from "@/lib/hooks/useSessionKey";
import { ICartProduct } from "@/lib/types/cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { buyValidator } from "@/lib/validators/buy";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/api/firebase_client";
import { useEffect } from "react";

export default function Buy({ products }: { products: ICartProduct[] }) {
  const { currentUser } = getAuth(app);

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(buyValidator),
    defaultValues: {
      name: currentUser?.displayName || "",
      email: currentUser?.email || "",
      billingAddress: {
        address: { country: "DK", city: "", postal_code: "", line1: "" },
      },
    },
  });
  const { sessionKey, isKeyLoading } = useSessionKey(products);

  const name = watch("name");
  const email = watch("email");
  const billingAddress = watch("billingAddress");

  useEffect(() => {
    if (currentUser?.email) {
      setValue("email", currentUser.email);
    }

    if (currentUser?.displayName) {
      setValue("name", currentUser.displayName);
    }
  }, [currentUser]);

  return (
    <form className="flex flex-1 flex-col gap-8">
      <Box>
        <div className="flex flex-1 flex-col md:flex-row gap-6">
          <div className="flex flex-1 lg:flex-row gap-1 lg:gap-8">
            <div className="flex flex-1 flex-col gap-1">
              <TextField
                defaultValue={""}
                label={"Email"}
                error={errors.email?.message}
                required
                {...register("email")}
              />
              <TextField
                label={"Full name"}
                error={errors.name?.message}
                required
                {...register("name")}
              />
              <TextField
                label={"Address"}
                error={errors.billingAddress?.address?.line1?.message}
                required
                {...register("billingAddress.address.line1")}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <TextField
                label={"City"}
                error={errors.billingAddress?.address?.city?.message}
                required
                {...register("billingAddress.address.city")}
              />
              <TextField
                label={"Postal code"}
                error={errors.billingAddress?.address?.postal_code?.message}
                required
                {...register("billingAddress.address.postal_code")}
              />
              <TextField
                disabled
                required
                error={errors.billingAddress?.address?.country?.message}
                label={"Country"}
                {...register("billingAddress.address.country")}
              />
            </div>
          </div>
        </div>
      </Box>
      <Box contentClassName={"gap-8 flex flex-1"}>
        {isKeyLoading && <Loader />}
        {sessionKey && !isKeyLoading && (
          <CheckoutProvider
            key={sessionKey}
            stripe={stripeClient}
            options={{
              elementsOptions: { appearance, fonts: [{ cssSrc: interUrl }] },
              fetchClientSecret: async () => sessionKey,
            }}
          >
            <Payment
              email={email}
              name={name}
              billingAddress={billingAddress}
              handleSubmit={handleSubmit}
            />
          </CheckoutProvider>
        )}
      </Box>
    </form>
  );
}
