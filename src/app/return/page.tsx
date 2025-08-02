import { Main } from "@/ui/layout/Main";
import { PageProps } from "../../../.next/types/app/return/page";
import { Box } from "@/ui/reusable/Box";
import Stripe from "stripe";

export default async function Return({ searchParams }: PageProps) {
  const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { session_id } = await searchParams;
  const { line_items, payment_intent } =
    await stripeServer.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });

  return (
    <Main>
      <h2>{"Thank you for your purchase!"}</h2>
      <ul className={"flex flex-col gap-0.5"}>
        {line_items?.data.map((i) => (
          <li key={i.id}>
            <Box>
              <span>{i.description}</span>
              <span>
                {i.quantity} x €{((i.price?.unit_amount || 0) / 100).toFixed(2)}
              </span>
            </Box>
          </li>
        ))}
      </ul>

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
