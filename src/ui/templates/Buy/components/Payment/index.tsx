import { friendlyPrice } from "@/lib/helpers/friendlyPrice";
import { toastError } from "@/lib/helpers/toastError";
import { IStripeForm } from "@/lib/types/stripe";
import { Button } from "@/ui/reusable/Button";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js";
import { FormEvent, useEffect } from "react";
import { UseFormHandleSubmit } from "react-hook-form";

export const Payment = ({
  email,
  billingAddress,
  handleSubmit,
}: IStripeForm & { handleSubmit: UseFormHandleSubmit<IStripeForm> }) => {
  const {
    confirm,
    canConfirm,
    updateEmail,
    updateBillingAddress,
    updateShippingAddress,
    total,
    currency,
  } = useCheckout();

  useEffect(() => {
    if (email) updateEmail(email);
  }, [email, updateEmail]);

  useEffect(() => {
    if (billingAddress) updateBillingAddress(billingAddress);
  }, [billingAddress, updateBillingAddress, updateShippingAddress]);

  const onSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      if (!canConfirm) {
        console.error("Validation error");
        toastError("Validation error");
      }

      const res = await confirm();

      if (res.type === "error") {
        console.error(res.error);
        toastError(res.error);
      }
    } catch (error) {
      console.error(error);
      toastError(error);
    }
  };

  return (
    <>
      <h3 className="text-4xl">
        {"Total: "}
        {friendlyPrice({ unit_amount: total.total.minorUnitsAmount, currency })}
      </h3>
      <PaymentElement
        options={{
          fields: {
            billingDetails: {
              address: {
                line1: "never",
                city: "never",
                postalCode: "never",
                country: "never",
              },
              email: "never",
              name: "never",
            },
          },
        }}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit(async () => {
            await onSubmit(e);
          })();
        }}
        disabled={!canConfirm}
        type="submit"
        className="flex-1"
      >
        {"PROCEED TO PAYMENT"}
      </Button>
    </>
  );
};
