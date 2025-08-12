import { IFormattedStripeProduct } from '@/lib/types/stripe';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id)
    return NextResponse.json(
      {
        message: "Product 'id' missing.",
      },
      { status: 400 },
    );

  const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const product = await stripeServer.products.retrieve(id);
    const prices = await stripeServer.prices.list({
      product: product.id,
    });

    const formattedProduct: IFormattedStripeProduct = {
      ...product,
      prices: prices.data.map(({ currency, unit_amount, id }) => ({
        currency,
        unit_amount,
        id,
      })),
    };

    return NextResponse.json({ product: formattedProduct });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
