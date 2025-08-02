import { IPrice } from "@/lib/types/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: Request) {
  const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || undefined;

  if (!id)
    return NextResponse.json({
      status: 400,
      message: "Price 'id' missing.",
    });

  try {
    const { currency, unit_amount } = await stripeServer.prices.retrieve(id);

    return NextResponse.json<{ price: IPrice }>({
      price: { currency, unit_amount },
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
