import { Main } from '@/ui/layout/Main';
import { PageProps } from '../../../.next/types/app/return/page';
import { Box } from '@/ui/reusable/Box';
import Stripe from 'stripe';
import { friendlyPrice } from '@/lib/helpers/friendlyPrice';
import { ResetCart } from '@/ui/templates/Cart/components/ResetCart';
import Link from 'next/link';
import { Button } from '@/ui/reusable/Button';

export default async function Return({ searchParams }: PageProps) {
  const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { session_id } = await searchParams;
  const { line_items, payment_intent } =
    await stripeServer.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent'],
    });

  return (
    <Main>
      <h2>{'Thank you for your purchase!'}</h2>
      <ul className={'flex flex-col gap-0.5'}>
        {line_items?.data.map((i) => (
          <li key={i.id}>
            <Box contentClassName='flex-row justify-between'>
              <span>{i.description}</span>
              {i.price && (
                <span>
                  {i.quantity} x{' '}
                  {friendlyPrice({
                    unit_amount: i.price.unit_amount,
                    currency: i.currency,
                  })}
                </span>
              )}
            </Box>
          </li>
        ))}
      </ul>

      <div className='flex flex-col justify-center items-end'>
        <h3>{'Total:'}</h3>
        <h4>
          {typeof payment_intent === 'string'
            ? payment_intent
            : !!payment_intent
              ? friendlyPrice({
                  unit_amount: payment_intent?.amount,
                  currency: payment_intent?.currency,
                })
              : null}
        </h4>
      </div>

      <Link href={'/'} className={'flex flex-col'}>
        <Button variant='outlined'>{'BACK TO MAINPAGE'}</Button>
      </Link>
      <ResetCart />
    </Main>
  );
}
