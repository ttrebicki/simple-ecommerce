'use client';
import { useBuyStore } from '@/lib/state/buy/useBuyStore';
import Buy from '@/ui/templates/Buy';
import { Item } from '@/ui/templates/Cart/components/CartItems';
import useSWR from 'swr';
import { productApi } from '@/lib/api/product';
import Loader from '@/ui/reusable/Loader';
import { Main } from '@/ui/layout/Main';
import { PageProps } from '../../../../../.next/types/app/product/[id]/buy/page';
import { useEffect, useState } from 'react';
import { toastError } from '@/lib/helpers/toastError';

export default function Page({ params }: PageProps) {
  const [productId, setId] = useState<string>();
  const buyStore = useBuyStore();
  const productFromStore = buyStore.items.find((i) => i.id === productId);
  const { data, isLoading } = useSWR(productId || null, productApi.getProduct);

  useEffect(() => {
    (async () => {
      try {
        const { id } = await params;
        setId(id);
      } catch (error) {
        console.error(error);
        toastError(error);
      }
    })();
  }, [params]);

  useEffect(() => {
    if (!productFromStore && data?.product)
      buyStore.add({ ...data.product, quantity: 1 });
  }, [data?.product]);

  return (
    <Main>
      {isLoading ? (
        <Loader />
      ) : !data?.product ? null : (
        <div className={'flex flex-col gap-8'}>
          <h2>{'Your items:'}</h2>
          <Item
            item={{
              ...data.product,
              quantity: productFromStore?.quantity || 0,
            }}
            {...buyStore}
          />
          {productFromStore && (
            <div className={'flex flex-col gap-8'}>
              <h2>{'Fill in the form to complete the order'}</h2>
              <Buy products={[productFromStore]} />
            </div>
          )}
        </div>
      )}
    </Main>
  );
}
