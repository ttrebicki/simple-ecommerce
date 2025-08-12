import { mapCartToLineItems } from '@/lib/api/stripe';
import { ISessionKeyResponse, IStripePaymentBody } from '@/lib/types/stripe';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs'; // force runtime for App Router

const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body: IStripePaymentBody = await req.json();

    if (!body)
      return NextResponse.json({ message: 'Bad Request' }, { status: 400 });

    const line_items = mapCartToLineItems(body.items);

    const session = await stripeServer.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: line_items.length ? 'payment' : 'setup',
      ui_mode: 'custom',
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json<ISessionKeyResponse>({
      sessionKey: session.client_secret,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message:
          typeof error === 'object' && 'message' in error! ? error.message : '',
      },
      { status: 500 },
    );
  }
}
