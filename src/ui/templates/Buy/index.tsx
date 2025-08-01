"use client";

import { IStripeForm } from "@/lib/types/stripe";
import { Box } from "@/ui/reusable/Box";
import { Button } from "@/ui/reusable/Button";
import { TextField } from "@/ui/reusable/TextField";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js";
import { FormEventHandler, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Buy() {
  const { watch, register } = useForm<IStripeForm>();

  const {
    confirm,
    canConfirm,
    updateEmail,
    updateBillingAddress,
    updateShippingAddress,
    total,
  } = useCheckout();

  const email = watch("email");
  const billing = watch("billingAddress");
  const shipping = watch("shippingAddress");

  useEffect(() => {
    if (email) updateEmail(email);
  }, [email]);

  useEffect(() => {
    if (billing) updateBillingAddress(billing);
    if (shipping) updateShippingAddress(shipping);
  }, [billing, shipping]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      const res = await confirm();

      if (res.type === "error") {
        console.error(res.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-8">
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
        <h3 className="text-4xl">
          {"Total: " + "€" + (total.total.minorUnitsAmount / 100).toFixed(2)}{" "}
        </h3>
        <PaymentElement
          options={{
            fields: {
              billingDetails: {
                address: { country: "never", postalCode: "never" },
              },
            },
          }}
        />
        <Button disabled={!canConfirm} type="submit" className="flex-1">
          {"PROCEED TO PAYMENT"}
        </Button>
      </Box>
    </form>
  );
}
