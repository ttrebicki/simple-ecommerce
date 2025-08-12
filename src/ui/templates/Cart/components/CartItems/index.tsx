'use client';

import { ICartItemProps } from './types';
import Image from 'next/image';
import { Button } from '@/ui/reusable/Button';
import { useCartStore } from '@/lib/state/cart/useCartStore';
import Link from 'next/link';
import { ICartState } from '@/lib/types/cart';
import { IconButton } from '@/ui/reusable/IconButton';
import { MdAdd, MdClose, MdRemove } from 'react-icons/md';
import { Box } from '@/ui/reusable/Box';
import { friendlyPrice } from '@/lib/helpers/friendlyPrice';
import toast from 'react-hot-toast';

export const Item = ({
  item,
  add,
  decrement,
  remove,
  isCart,
}: ICartItemProps) => {
  const { images, name, quantity, prices, id } = item;
  const removedMsg = `${name} removed from cart.`;

  const handleAdd = () => {
    add({ ...item, quantity: 1 });
  };
  const handleDecrement = () => {
    decrement(id);
    if (item.quantity === 1 && isCart) toast.success(removedMsg);
  };
  const handleRemove = () => {
    remove(id);
    toast.success(removedMsg);
  };

  return (
    <li
      className={'flex flex-1 relative w-full text-xs sm:text-sm lg:text-base'}
    >
      <Box
        direction={'row'}
        className={'justify-between items-center'}
        imageSlot={
          images?.length && (
            <div className={'relative w-full h-[80px]'}>
              <Image
                fill
                src={images[0]}
                alt={name}
                className={'object-cover'}
              />
            </div>
          )
        }
      >
        <Link href={`/product/${id}`} className={'flex flex-2 gap-8 relative'}>
          <div className={'flex flex-2 gap-4 items-center'}>
            <span>{name}</span>
          </div>
        </Link>
        <div
          className={'flex flex-1 gap-1 lg:gap-4 items-center justify-center'}
        >
          <IconButton
            disabled={!isCart ? quantity === 1 : undefined}
            onClick={handleDecrement}
          >
            <MdRemove />
          </IconButton>
          <span>{quantity}</span>
          <IconButton onClick={handleAdd}>
            <MdAdd />
          </IconButton>
        </div>
        {prices[0] && (
          <span className='flex flex-1 justify-center'>
            {friendlyPrice({
              ...prices[0],
              unit_amount: (prices[0].unit_amount || 0) * quantity,
            })}
          </span>
        )}
        {isCart && (
          <IconButton onClick={handleRemove}>
            <MdClose />
          </IconButton>
        )}
      </Box>
    </li>
  );
};

export const Items = ({
  items,
  add,
  decrement,
  remove,
}: Omit<ICartState, 'clear'>) => {
  return (
    <ul className={'flex flex-col gap-2'}>
      {items.map((item, index) => (
        <Item
          key={`cart-product-${item.id}-${index}`}
          item={item}
          add={add}
          decrement={decrement}
          remove={remove}
          isCart
        />
      ))}
    </ul>
  );
};

export const CartItems = () => {
  const { items, add, decrement, remove, clear } = useCartStore();

  const backToMainPage = (
    <Link href={'/'} className={'flex flex-col'}>
      <Button variant='outlined'>{'BACK TO MAINPAGE'}</Button>
    </Link>
  );

  return (
    <div className={'flex flex-col gap-4'}>
      {items.length ? (
        <Items items={items} add={add} decrement={decrement} remove={remove} />
      ) : (
        <>
          <h2>{'Your cart looks empty... 🙄'}</h2>
          <p>{'Try adding some products: 🤓'}</p>
          {backToMainPage}
        </>
      )}
      {!!items.length && (
        <div className={'flex flex-col gap-4'}>
          <Link href={'/cart/buy'} className={'flex flex-col'}>
            <Button>{'BUY'}</Button>
          </Link>
          <Button variant='outlined' onClick={clear}>
            {'CLEAR'}
          </Button>
          {backToMainPage}
        </div>
      )}
    </div>
  );
};
