import { IFormattedStripeProduct } from "@/lib/types/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: Request) {
  const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const url = new URL(request.url);
  const phraseParam = url.searchParams.get("phrase") ?? "";
  const page = url.searchParams.get("page") ?? undefined;
  const limit = parseInt(url.searchParams.get("limit") ?? "12", 10);

  const query = `name~"${phraseParam}" OR description~"${phraseParam}"`;

  try {
    const res = await stripeServer.products.search({
      page,
      limit,
      query,
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
      Stripe.Response<Stripe.ApiSearchResult<IFormattedStripeProduct>>
    >({ ...res, data: formattedProducts });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
