'use client';

import { useCartStore } from '@/lib/state/cart/useCartStore';
import { IconButton } from '@/ui/reusable/IconButton';
import { MdShoppingCart } from 'react-icons/md';

export default function CartButton() {
  const { items } = useCartStore();

  return (
    <IconButton>
      {!!items.length && (
        <div
          className={
            'flex absolute bg-primary-main rounded-full top-[-0.25px] left-[-0.25px] w-[20px] h-[20px] p-2 text-xs justify-center items-center'
          }
        >
          {items.length}
        </div>
      )}
      <MdShoppingCart
        size={32}
        color='var(--text)'
        className={'height-[200px]'}
      />
    </IconButton>
  );
}
