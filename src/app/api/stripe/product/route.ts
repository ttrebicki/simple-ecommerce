// app/api/products/route.ts
import { IFormattedStripeProduct } from "@/lib/types/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id)
    return NextResponse.json({
      status: 400,
      message: "Product 'id' missing.",
    });

  const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const product = await stripeServer.products.retrieve(id);
    const prices = await stripeServer.prices.list({
      product: product.id,
    });

    const formattedProduct: IFormattedStripeProduct = {
      ...product,
      prices: prices.data.map(({ currency, unit_amount }) => ({
        currency,
        unit_amount,
      })),
    };

    return NextResponse.json(formattedProduct);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
