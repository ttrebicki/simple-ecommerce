import { Main } from "@/ui/layout/Main";
import Stripe from "stripe";
import { PageProps } from "../../../.next/types/app/return/page";
import { Box } from "@/ui/reusable/Box";

export default async function Return({ searchParams }: PageProps) {
  const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY!); // TODO: move
  const { session_id } = await searchParams;
  const { line_items, payment_intent } =
    await stripeServer.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });

  return (
    <Main>
      <h2>Thank you for your purchase!</h2>
      {line_items?.data.map((i) => (
        <Box key={i.id}>
          <span>{i.description}</span>
          <span>
            {i.quantity} x €{((i.price?.unit_amount || 0) / 100).toFixed(2)}
          </span>
        </Box>
      ))}

      <div>
        <h3>{"Total:"}</h3>
        <h4>
          {typeof payment_intent === "string"
            ? payment_intent
            : "€" + ((payment_intent?.amount || 0) / 100).toFixed(2)}
        </h4>
      </div>
    </Main>
  );
}
