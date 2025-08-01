import { IStripeForm } from "@/lib/types/stripe";
import { Button } from "@/ui/reusable/Button";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js";
import { FormEventHandler, useEffect } from "react";

export const Payment = ({
  email,
  billingAddress,
  shippingAddress,
  handleSubmit,
}: IStripeForm) => {
  const {
    confirm,
    canConfirm,
    updateEmail,
    updateBillingAddress,
    updateShippingAddress,
    total,
  } = useCheckout();

  useEffect(() => {
    if (email) updateEmail(email);
  }, [email, updateEmail]);

  useEffect(() => {
    if (billingAddress) updateBillingAddress(billingAddress);
    if (shippingAddress) updateShippingAddress(shippingAddress);
  }, [
    billingAddress,
    shippingAddress,
    updateBillingAddress,
    updateShippingAddress,
  ]);

  const onSubmit: FormEventHandler<HTMLButtonElement> = async (event) => {
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
    <>
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
      <Button
        onClick={onSubmit}
        disabled={!canConfirm}
        type="submit"
        className="flex-1"
      >
        {"PROCEED TO PAYMENT"}
      </Button>
    </>
  );
};
