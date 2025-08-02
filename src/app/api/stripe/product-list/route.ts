import { IFormattedStripeProduct } from "@/lib/types/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: Request) {
  const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const url = new URL(request.url);
  const starting_after = url.searchParams.get("starting_after") || undefined;

  try {
    const res = await stripeServer.products.list({
      limit: 12,
      starting_after,
    });

    const formattedProductsMap = res.data.map(async (p) => {
      const prices = await stripeServer.prices.list({ product: p.id });

      return {
        ...p,
        prices: prices.data.map(({ currency, unit_amount }) => ({
          currency,
          unit_amount,
        })),
      };
    });

    const formattedProducts: IFormattedStripeProduct[] = await Promise.all(
      formattedProductsMap
    );

    return NextResponse.json<
      Stripe.Response<Stripe.ApiList<IFormattedStripeProduct>>
    >({ ...res, data: formattedProducts });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
