'use client';
import { useCartStore } from '@/lib/hooks/state/useCartStore';

import { Main } from '@/ui/layout/Main';
import Buy from '@/ui/templates/Buy';
import { Items } from '@/ui/templates/Cart/components/CartItems';

export default function CartBuy() {
  const cartStore = useCartStore();

  return (
    <Main>
      <div className='flex flex-col gap-8'>
        <h2>{'Your items:'}</h2>
        <Items {...cartStore} />
        <div className={'flex flex-col gap-8'}>
          <h2>{'Fill the form to complete the order'}</h2>
          <Buy products={cartStore.items} />
        </div>
      </div>
    </Main>
  );
}
